import subprocess
import json
import re
import sys
import argparse
from concurrent.futures import ThreadPoolExecutor

def run_cmd(cmd, check=True):
    res = subprocess.run(cmd, capture_output=True, text=True)
    if check and res.returncode != 0:
        raise RuntimeError(f"Command {' '.join(cmd)} failed:\n{res.stderr}")
    return res

def get_repo_stars(repo_url):
    m = re.search(r'github\.com/([^/]+)/([^/#\?]+)', repo_url)
    if not m:
        return 0
    owner, repo = m.group(1), m.group(2)
    if repo.endswith('.git'):
        repo = repo[:-4]
    res = run_cmd(['gh', 'api', f'repos/{owner}/{repo}', '--jq', '.stargazers_count'], check=False)
    if res.returncode != 0:
        return 0
    try:
        return int(res.stdout.strip())
    except ValueError:
        return 0

def review_pr(pr_number):
    view_res = run_cmd(['gh', 'pr', 'view', str(pr_number), '--json', 'number,title,author,files,mergeable,maintainerCanModify,headRefName,headRepositoryOwner,body,url,createdAt'], check=False)
    if view_res.returncode != 0:
        return None
    pr_data = json.loads(view_res.stdout)
    diff_res = run_cmd(['gh', 'pr', 'diff', str(pr_number)], check=False)
    diff = diff_res.stdout

    # Restrict link detection to added lines only (+) to avoid false matches on deleted/context lines
    added_lines = [line[1:] for line in diff.splitlines() if line.startswith('+') and not line.startswith('+++')]
    added_text = "\n".join(added_lines)

    repo_urls = list(set(re.findall(r'"repo_url":\s*"([^"]+)"', added_text)))
    if not repo_urls:
        urls = list(set(re.findall(r'github\.com/([a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+)', added_text)))
        repo_urls = ['https://github.com/' + u for u in urls if 'open-source-mac-os-apps' not in u]

    stars_map = {url: get_repo_stars(url) for url in repo_urls}
    max_stars = max(stars_map.values()) if stars_map else 0

    files_changed = [f['path'] for f in pr_data.get('files', [])]
    edits_app_json = 'applications.json' in files_changed
    edits_readme_only = files_changed == ['README.md']

    return {
        'pr': pr_data,
        'files': files_changed,
        'repo_urls': repo_urls,
        'stars_map': stars_map,
        'max_stars': max_stars,
        'edits_app_json': edits_app_json,
        'edits_readme_only': edits_readme_only,
    }

def main():
    parser = argparse.ArgumentParser(description="Review and merge PRs into open-source-mac-os-apps")
    parser.add_argument('--limit', type=int, default=10, help="Number of oldest open PRs to review")
    parser.add_argument('--min-stars', type=int, default=5, help="Minimum stars threshold (must be >= 5)")
    args = parser.parse_args()

    print(f"Fetching {args.limit} oldest open PRs...", flush=True)
    cmd = ['gh', 'pr', 'list', '--search', 'state:open sort:created-asc', '--limit', str(args.limit), '--json', 'number,title,url,createdAt,author']
    res = run_cmd(cmd)
    prs = json.loads(res.stdout)

    print(f"Found {len(prs)} PRs. Processing in parallel...\n", flush=True)

    with ThreadPoolExecutor(max_workers=min(len(prs), 10)) as executor:
        results = list(executor.map(lambda item: review_pr(item['number']), prs))

    for info in results:
        if not info:
            continue
        pr = info['pr']
        num = pr['number']
        print(f"PR #{num}: {pr['title']} by @{pr['author']['login']}", flush=True)
        print(f"  Files: {info['files']}", flush=True)
        print(f"  Max stars: {info['max_stars']} ({info['stars_map']})", flush=True)
        print(f"  Mergeable: {pr.get('mergeable')}", flush=True)
        print(f"  Qualifies (>= {args.min_stars} stars): {info['max_stars'] >= args.min_stars}", flush=True)
        print(flush=True)

if __name__ == '__main__':
    main()
