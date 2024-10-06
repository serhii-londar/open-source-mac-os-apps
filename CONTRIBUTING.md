# Contribution Guidelines

Please ensure your pull request adheres to the following guidelines:

- Search previous suggestions before making a new one, as yours may be a duplicate.
- Make an individual pull request for each suggestion.
- Edit [applications.json](https://github.com/serhii-londar/open-source-mac-os-apps/blob/master/applications.json) instead of [README.md](https://github.com/serhii-londar/open-source-mac-os-apps/blob/master/README.md).
- Use the following format: 
```json
    {
            "short_description": "Description of repository",
            "categories": [
                "Application category 1",
                "Application category 2"
            ],
            "repo_url": "Link to repository",
            "title": "Name of application",
            "icon_url": "URL to application icon",
            "screenshots": [
               "Screenshot url 1",
               "Screenshot url 2"
            ],
            "official_site": "Official site link",
            "languages": [
                "Language name"
            ]
        }
```
- New categories, or improvements to the existing categorization are welcome. List of all categories can be found in [categories.json](https://github.com/serhii-londar/open-source-mac-os-apps/blob/master/categories.json).
- Keep descriptions short and simple, but descriptive.
- End all descriptions with a full stop/period.
- Check your spelling and grammar.
- Make sure your text editor is set to remove trailing whitespace.

#### Deleting 

Typical reasons for deleting a project:

- Doesn't build in the current Xcode
- No updates / no longer works
- Deprecated
- Lacks license

#### Projects are ineligible if:

- Lack recent commit
- README is not clear or not written in English

Your contributions are always welcome! Thank you for your suggestions! :smiley:
