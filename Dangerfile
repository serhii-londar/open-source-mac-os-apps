# Ensure there is a summary for a pull request
fail 'Please provide a summary in the Pull Request description' if github.pr_body.length < 5

# Warn when there are merge commits in the diff
warn 'Please rebase to get rid of the merge commits in this Pull Request' if git.commits.any? { |c| c.message =~ /^Merge branch 'master'/ }

# Warn if pull request is not updated
warn 'Please update the Pull Request title to contain the library name' if github.pr_title.include? 'Update README.md'

# Check links
require 'json'
results = File.read 'ab-results-applications.json-markdown-table.json'
j = JSON.parse results
if j['error']==true
  m = j['title']
  m << ', a project collaborator will take care of these, thanks :)'
  warn m
  markdown j['message']
end
