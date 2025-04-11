//
//  main.swift
//  ReadmeGenerator
//
//  Created by Serhii Londar on 4/23/19.
//  Copyright © 2019 Serhii Londar. All rights reserved.
//

import Foundation

let header = """
<div align="center">
  <a href="https://vshymanskyy.github.io/StandWithUkraine">
    <img src="https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg" alt="Stand With Ukraine" />
  </a>
  
  <img src="./icons/icon.png">
  <h1>Awesome macOS Open Source Applications</h1>
  <p>A curated list of open source applications for macOS</p>
  <p>
    <a href="https://github.com/sindresorhus/awesome"><img alt="Awesome" src="https://awesome.re/badge.svg" /></a>
    <a href="https://gitter.im/open-source-mac-os-apps/Lobby"><img alt="Join the chat at gitter" src="https://badges.gitter.im/Join%20Chat.svg" /></a>
    <a href="https://t.me/opensourcemacosapps"><img alt="Telegram Channel" src="https://img.shields.io/badge/Telegram-Channel-blue.svg" /></a>
  </p>
</div>

<p align="center">
  <a href="#audio">Audio</a> •
  <a href="#backup">Backup</a> •
  <a href="#browser">Browser</a> •
  <a href="#chat">Chat</a> •
  <a href="#cryptocurrency">Crypto</a> •
  <a href="#database">Database</a> •
  <a href="#development">Dev</a> •
  <a href="#editors">Editors</a> •
  <a href="#graphics">Graphics</a> •
  <a href="#productivity">Productivity</a> •
  <a href="#utilities">Utilities</a>
</p>

List of awesome open source applications for macOS. This list contains a lot of native, and cross-platform apps. The main goal of this repository is to find free open source apps and start contributing. Feel free to [contribute](CONTRIBUTING.md) to the list, any suggestions are welcome!

To receive all new or popular applications you can join our [telegram channel](https://t.me/opensourcemacosapps).

## Support

Hey friend! Help me out for a couple of :beers:!  <span class="badge-patreon"><a href="https://www.patreon.com/serhiilondar" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>

## Languages

You can see in which language an app is written. Currently there are following languages:

- ![c_icon] - C language.
- ![cpp_icon] - C++ language.
- ![c_sharp_icon] - C# language.
- ![clojure_icon] - Clojure language.
- ![coffee_script_icon] - CoffeeScript language.
- ![css_icon] - CSS language.
- ![go_icon] - Go language.
- ![elm_icon] - Elm language.
- ![haskell_icon] - Haskell language.
- ![javascript_icon] - JavaScript language.
- ![lua_icon] - Lua language.
- ![objective_c_icon] - Objective-C language.
- ![python_icon] - Python language.
- ![ruby_icon] - Ruby language.
- ![rust_icon] - Rust language.
- ![shell_icon] - Shell language.
- ![swift_icon] - Swift language.
- ![typescript_icon] - TypeScript language.


## Contents
- [Audio](#audio)
- [Backup](#backup)
- [Browser](#browser)
- [Chat](#chat)
- [Cryptocurrency](#cryptocurrency)
- [Database](#database)
- [Development](#development)
- [Git](#git)
- [iOS / macOS](#ios--macos)
- [JSON Parsing](#json-parsing)
- [Web development](#web-development)
- [Other development](#other-development)
- [Downloader](#downloader)
- [Editors](#editors)
- [CSV](#csv)
- [JSON](#json)
- [Markdown](#markdown)
- [TeX](#tex)
- [Text](#text)
- [Extensions](#extensions)
- [Finder](#finder)
- [Games](#games)
- [Graphics](#graphics)
- [IDE](#ide)
- [Images](#images)
- [Keyboard](#keyboard)
- [Mail](#mail)
- [Menubar](#menubar)
- [Music](#music)
- [News](#news)
- [Notes](#notes)
- [Other](#other)
- [Podcast](#podcast)
- [Productivity](#productivity)
- [Screensaver](#screensaver)
- [Security](#security)
- [Sharing Files](#sharing-files)
- [Social Networking](#social-networking)
- [Streaming](#streaming)
- [System](#system)
- [Terminal](#terminal)
- [Touch Bar](#touch-bar)
- [Utilities](#utilities)
- [VPN & Proxy](#vpn--proxy)
- [Video](#video)
- [Wallpaper](#wallpaper)
- [Window Management](#window-management)

## Applications

"""

let footer = """

<div align="right"><a href="#contents">⬆️ Back to Top</a></div>

## Contributors

Thanks to all the people who contribute:

<a href="https://github.com/serhii-londar/open-source-mac-os-apps/graphs/contributors"><img src="https://opencollective.com/open-source-mac-os-apps/contributors.svg?width=890&button=false" /></a>

[app_store]: ./icons/app_store-16.png 'App Store.'
[c_icon]: ./icons/c-16.png 'C language.'
[cpp_icon]: ./icons/cpp-16.png 'C++ language.'
[c_sharp_icon]: ./icons/csharp-16.png 'C# Language'
[clojure_icon]: ./icons/clojure-16.png 'Clojure Language'
[coffee_script_icon]: ./icons/coffeescript-16.png 'CoffeeScript language.'
[css_icon]: ./icons/css-16.png 'CSS language.'
[go_icon]: ./icons/golang-16.png 'Go language.'
[elm_icon]: ./icons/elm-16.png 'Elm Language'
[haskell_icon]: ./icons/haskell-16.png 'Haskell language.'
[java_icon]: ./icons/java-16.png 'Java language.'
[javascript_icon]: ./icons/javascript-16.png 'JavaScript language.'
[lua_icon]: ./icons/Lua-16.png 'Lua language.'
[objective_c_icon]: ./icons/objective-c-16.png 'Objective-C language.'
[python_icon]: ./icons/python-16.png 'Python language.'
[ruby_icon]: ./icons/ruby-16.png 'Ruby language.'
[rust_icon]: ./icons/rust-16.png 'Rust language.'
[shell_icon]: ./icons/shell-16.png 'Shell language.'
[swift_icon]: ./icons/swift-16.png 'Swift language.'
[typescript_icon]: ./icons/typescript-16.png 'TypeScript language.'
"""

class JSONApplications: Codable {
    let applications: [JSONApplication]
    
    enum CodingKeys: String, CodingKey {
        case applications
    }
    
    init(applications: [JSONApplication]) {
        self.applications = applications
    }
    
    required public init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        applications = try values.decodeIfPresent([JSONApplication].self, forKey: .applications) ?? []
    }
}

class JSONApplication: Codable {
    var title: String
    var iconURL: String
    var repoURL: String
    var shortDescription: String
    var languages: [String]
    var screenshots: [String]
    var categories: [String]
    var officialSite: String
    
    enum CodingKeys: String, CodingKey {
        case title
        case iconURL = "icon_url"
        case repoURL = "repo_url"
        case shortDescription = "short_description"
        case languages
        case screenshots
        case categories
        case officialSite = "official_site"
    }
    
    init(title: String, iconURL: String, repoURL: String, shortDescription: String, languages: [String], screenshots: [String], categories: [String], officialSite: String) {
        self.title = title
        self.iconURL = iconURL
        self.repoURL = repoURL
        self.shortDescription = shortDescription
        self.languages = languages
        self.screenshots = screenshots
        self.categories = categories
        self.officialSite = officialSite
    }
}

class Categories: Codable {
    let categories: [Category]
    
    init(categories: [Category]) {
        self.categories = categories
    }
    
    required public init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        categories = try values.decodeIfPresent([Category].self, forKey: .categories) ?? []
    }
}

class Category: Codable {
    let title, id, description: String
    let parent: String?
    
    init(title: String, id: String, description: String, parent: String?) {
        self.title = title
        self.id = id
        self.description = description
        self.parent = parent
    }
}

class ReadmeGenerator {
    var readmeString = String.empty
    
    func generateReadme() {
        print("Start")
        do {
            // get current file path:
            let thisFilePath:String = #file
            var url = URL(fileURLWithPath: thisFilePath)

            //cd ../ to the root folder: (delete `.github/main.swift`
            url = url.deletingLastPathComponent().deletingLastPathComponent()

            let applicationsUrl = url.appendingPathComponent(FilePaths.applications.rawValue)
            let applicationsData = try Data(contentsOf: applicationsUrl)
            let categoriesData = try Data(contentsOf: url.appendingPathComponent(FilePaths.categories.rawValue))
            let jsonDecoder = JSONDecoder()
            let applicationsObject = try jsonDecoder.decode(JSONApplications.self, from: applicationsData)
            let categoriesObject = try jsonDecoder.decode(Categories.self, from: categoriesData)
            
            var categories = categoriesObject.categories
            let subcategories = categories.filter({ $0.parent != nil && !$0.parent!.isEmpty })
            let applications = applicationsObject.applications
            
            for subcategory in subcategories {
                if let index = categories.lastIndex(where: { $0.parent != subcategory.id }) {
                    categories.remove(at: index)
                }
            }
            
            categories = categories.sorted(by: { $0.title < $1.title })
            
            readmeString.append(header)
            print("Start iteration....")
            
            for category in categories {
                // Add category header with emoji and count
                let categoryApps = applications.filter({ $0.categories.contains(category.id) })
                let categoryCount = categoryApps.count
                let categoryEmoji = getCategoryEmoji(category.id)
                readmeString.append(String.enter + String.section + String.space + categoryEmoji + String.space + category.title + String.space + "(\(categoryCount))" + String.enter)
                
                var categoryApplications = categoryApps
                categoryApplications = categoryApplications.sorted(by: { $0.title < $1.title })
                
                for application in categoryApplications {
                    readmeString.append(application.markdownDescription())
                    readmeString.append(String.enter)
                }
                
                // Add "Back to Top" link at the end of each category
                readmeString.append("<div align=\"right\"><a href=\"#contents\">⬆️ Back to Top</a></div>" + String.enter)
                
                var subcategories = subcategories.filter({ $0.parent == category.id })
                guard subcategories.count > 0 else { continue }
                subcategories = subcategories.sorted(by: { $0.title < $1.title })
                for subcategory in subcategories {
                    // Add subcategory header with emoji and count
                    let subcategoryApps = applications.filter({ $0.categories.contains(subcategory.id) })
                    let subcategoryCount = subcategoryApps.count
                    let subcategoryEmoji = getCategoryEmoji(subcategory.id)
                    readmeString.append(String.enter + String.subsection + String.space + subcategoryEmoji + String.space + subcategory.title + String.space + "(\(subcategoryCount))" + String.enter)
                    
                    var categoryApplications = subcategoryApps
                    categoryApplications = categoryApplications.sorted(by: { $0.title < $1.title })
                    
                    for application in categoryApplications {
                        readmeString.append(application.markdownDescription())
                        readmeString.append(String.enter)
                    }
                    
                    // Add "Back to Top" link at the end of each subcategory
                    readmeString.append("<div align=\"right\"><a href=\"#contents\">⬆️ Back to Top</a></div>" + String.enter)
                }
            }
            print("Finish iteration...")
            readmeString.append(footer)
            try readmeString.data(using: .utf8)?.write(to: url.appendingPathComponent(FilePaths.readme.rawValue))
            print("Finish")
        } catch {
            print(error)
        }
    }
}

extension String {
    static let empty = ""
    static let space = " "
    static let enter = "\n"
    static let section = "###"
    static let subsection = "####"
    static let iconPrefix = "_icon"
}

extension JSONApplication {
    func markdownDescription() -> String {
        var markdownDescription = String.empty
        var languages: String = String.empty
        for lang in self.languages {
            languages.append("![\(lang)\(String.iconPrefix)] ")
        }
        
        // Create a collapsible section for each application
        markdownDescription.append("<details>")
        markdownDescription.append("<summary><b>[\(self.title)](\(self.repoURL))</b> - \(self.shortDescription)</summary>")
        markdownDescription.append("<p>")
        
        // Add languages
        markdownDescription.append("<b>Languages:</b> \(languages)<br>")
        
        // Add official site if available
        if !self.officialSite.isEmpty {
            markdownDescription.append("<b>Website:</b> <a href=\"\(self.officialSite)\">\(self.officialSite)</a><br>")
        }
        
        // Add screenshots with lazy loading to improve page load performance
        if self.screenshots.count > 0 {
            markdownDescription.append("<b>Screenshots:</b><br>")
            
            // Limit to first 3 screenshots to reduce load time
            let limitedScreenshots = self.screenshots.count > 3 ? Array(self.screenshots.prefix(3)) : self.screenshots
            
            limitedScreenshots.forEach({
                markdownDescription.append("<img src='\($0)' width='400' loading='lazy'/><br>")
            })
            
            // Add a note if there are more screenshots
            if self.screenshots.count > 3 {
                markdownDescription.append("<em>(\(self.screenshots.count - 3) more screenshots available in the repository)</em><br>")
            }
        }
        
        markdownDescription.append("</p>")
        markdownDescription.append("</details>")
        
        return markdownDescription
    }
}

// Helper function to get emoji for categories
func getCategoryEmoji(_ categoryId: String) -> String {
    switch categoryId {
    case "audio": return "🎵"
    case "backup": return "💾"
    case "browser": return "🌐"
    case "chat": return "💬"
    case "cryptocurrency": return "💰"
    case "database": return "🗄️"
    case "development": return "👨‍💻"
    case "downloader": return "⬇️"
    case "editors": return "📝"
    case "extensions": return "🧩"
    case "finder": return "🔍"
    case "games": return "🎮"
    case "graphics": return "🎨"
    case "ide": return "💻"
    case "images": return "🖼️"
    case "keyboard": return "⌨️"
    case "mail": return "📧"
    case "menubar": return "📊"
    case "music": return "🎧"
    case "news": return "📰"
    case "notes": return "📔"
    case "productivity": return "⏱️"
    case "security": return "🔒"
    case "sharing-files": return "📤"
    case "social-networking": return "👥"
    case "system": return "⚙️"
    case "terminal": return "📺"
    case "utilities": return "🛠️"
    case "video": return "🎬"
    case "vpn--proxy": return "🔐"
    case "wallpaper": return "🖥️"
    case "window-management": return "🪟"
    default: return "📦"
    }
}

enum FilePaths: String {
    case readme = "./README.md"
    case applications = "./applications.json"
    case categories = "./categories.json"
}

struct Constants {
    static let detailsBeginString = "<details> <summary> Screenshots </summary> <p float=\"left\">"
    static let detailsEndString = "</p></details>"
    static let srcLinePattern = "<bt><img src='%@' width=\"400\"/>"
    
    static let startProcessString = "### Database"
    static let endProcessString = "### Development"
    
    static func regex(for type: String) -> String {
        return "\\((.+\\.\(type))"
    }
    static func regex1(for type: String) -> String {
        return "\\\"(.+\\.\(type))"
    }
}

ReadmeGenerator().generateReadme()

