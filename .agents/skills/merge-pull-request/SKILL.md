---
name: merge-pull-request
description: >-
  Review, validate, fix conflicts, and merge pull requests (MRs/PRs) for open-source-mac-os-apps.
  Use this skill when asked to review or merge pull requests, filter PRs by stars threshold,
  fix formatting issues or merge conflicts in applications.json, and cleanly merge PRs to master.
---

# Merge Pull Request Skill

Use this workflow to review, sanitize, format, and merge incoming pull requests to `open-source-mac-os-apps`.

## Core Repository Guidelines

1. **All application entries must be added to [`applications.json`](../../applications.json)**. Changes should **NOT** edit `README.md` or `api.json` directly.
2. **Automated README Generation**: Whenever commits land on `master`, GitHub Actions (`generate-readme` workflow) automatically runs `swift ./.github/main.swift` and updates `README.md`.
3. **Star Threshold Requirement**: Check the GitHub star count of the target application repository (must be >= 5 stars unless specified otherwise).
4. **Handling Non-Qualifying PRs (< 5 stars or invalid format)**:
   - Automatically process and squash-merge PRs with **>= 5 stars** that meet schema and repository guidelines.
   - Do **NOT** automatically decline or close PRs with **< 5 stars** or other non-qualifying issues (e.g. missing license, non-app submission, broken link) without prior confirmation.
   - Compile a list of non-qualifying PRs and present them to the repository owner for **manual review**. Only close non-qualifying PRs after explicit confirmation.
5. **Valid Schema in [`applications.json`](../../applications.json)**:
   - `title`: String (Official application name)
   - `short_description`: String (Short, concise, ends with a period `.`)
   - `categories`: Array of valid category IDs matching [`categories.json`](../../categories.json)
   - `repo_url`: String (GitHub repository URL)
   - `icon_url`: String (Direct raw image URL, e.g. `raw.githubusercontent.com/...`, or empty `""`)
   - `screenshots`: Array of image URLs (can be empty `[]`)
   - `official_site`: String (Official website URL, or empty `""`)
   - `languages`: Array of lowercase language strings (e.g., `["swift"]`, `["python"]`)

---

## Step-by-Step Merge Workflow

### 1. List & Filter Pull Requests

List oldest open PRs using the GitHub CLI:

```bash
gh pr list --search "state:open sort:created-asc" --limit 10 --json number,title,url,createdAt,headRefName,author
```

Or run the bundled parallel review script:

```bash
python3 .agents/skills/merge-pull-request/scripts/review_prs.py --limit 10 --min-stars 5
```

For each PR, verify:
- Target repository star count (`gh api repos/<owner>/<repo> --jq .stargazers_count`).
- Files changed: Ensure only `applications.json` is modified. If `README.md` was edited instead, port the entry to `applications.json` and discard the `README.md` diff.

---

### 2. Check Out PR & Fix Conflicts

1. Check out the PR branch locally:
   ```bash
   gh pr checkout <PR_NUMBER>
   ```

2. Check maintainer permission:
   ```bash
   gh pr view <PR_NUMBER> --json maintainerCanModify,headRepositoryOwner,headRefName
   ```

3. If the PR was created from an older commit and has conflicts, or directly modified `README.md`:
   - Reset or rebase to `origin/master`:
     ```bash
     git reset --hard master
     ```
   - Revert any direct edits to `README.md` or `api.json`.
   - Add/format the entry cleanly into [`applications.json`](../../applications.json).

---

### 3. Validate Entry Locally

Always run the Swift generator before pushing to guarantee schema correctness:

```bash
swift ./.github/main.swift
```

- Ensure it outputs `Invalid/skipped: 0` and exits with code 0.
- Discard generated local changes to `README.md` and `api.json` so only `applications.json` is committed:
  ```bash
  git restore README.md api.json
  ```

---

### 4. Commit and Push to the PR Branch

1. Stage and commit the corrected entry:
   ```bash
   git add applications.json
   git commit -m "Add <AppName> to applications.json (#<PR_NUMBER>)"
   ```

2. Push to the author's fork branch:
   ```bash
   git push https://github.com/<AUTHOR>/open-source-mac-os-apps.git HEAD:<HEAD_BRANCH> --force
   ```

3. Verify PR status on GitHub:
   ```bash
   gh pr view <PR_NUMBER> --json mergeable,mergeStateStatus,files
   ```

---

### 5. Merge the PR & Sync Master

1. Merge using squash merge:
   ```bash
   gh pr merge <PR_NUMBER> --squash --subject "Add <AppName> to applications.json (#<PR_NUMBER>)"
   ```

2. Switch back to master and pull:
   ```bash
   git checkout master
   git pull origin master
   ```

3. Clean up the local PR tracking branch:
   ```bash
   git branch -D <BRANCH_NAME>
   ```

4. Optionally re-run the generator on `master` to sync `README.md` & `api.json`:
   ```bash
   swift ./.github/main.swift
   git add README.md api.json && git commit -m "Generate README.md and api.json" && git push origin master
   ```
