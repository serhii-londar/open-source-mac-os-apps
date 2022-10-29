//
//  main.swift
//  ReadmeGenerator
//
//  Created by Serhii Londar on 4/23/19.
//  Copyright © 2019 Serhii Londar. All rights reserved.
//

import Foundation

let header = """
[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine)

<p align="center">
<img src="./icons/icon.png">
</p>

# Awesome macOS open source applications

<p align="left">
<a href="https://github.com/sindresorhus/awesome"><img alt="Awesome" src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg" /></a>
<a href="https://gitter.im/open-source-mac-os-apps/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link"><img alt="Join the chat at gitter" src="https://badges.gitter.im/Join%20Chat.svg" /></a>
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
                readmeString.append(String.enter + String.section + String.space + category.title + String.enter)
                var categoryApplications = applications.filter({ $0.categories.contains(category.id) })
                categoryApplications = categoryApplications.sorted(by: { $0.title < $1.title })
                
                for application in categoryApplications {
                    readmeString.append(application.markdownDescription())
                    readmeString.append(String.enter)
                }
                
                var subcategories = subcategories.filter({ $0.parent == category.id })
                guard subcategories.count > 0 else { continue }
                subcategories = subcategories.sorted(by: { $0.title < $1.title })
                for subcategory in subcategories {
                    readmeString.append(String.enter + String.subsection + String.space + subcategory.title + String.enter)
                    var categoryApplications = applications.filter({ $0.categories.contains(subcategory.id) })
                    categoryApplications = categoryApplications.sorted(by: { $0.title < $1.title })
                    
                    for application in categoryApplications {
                        readmeString.append(application.markdownDescription())
                        readmeString.append(String.enter)
                    }
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
        
        markdownDescription.append("- [\(self.title)](\(self.repoURL)) - \(self.shortDescription) \(languages)")
        /*
         if self.screenshots.count > 0 {
         var screenshotsString = String.empty
         screenshotsString += (String.space + Constants.detailsBeginString + String.space)
         self.screenshots.forEach({
         screenshotsString += (String.space + (NSString(format: Constants.srcLinePattern as NSString, $0 as CVarArg) as String) + String.space)
         })
         screenshotsString += (String.space + Constants.detailsEndString + String.space)
         markdownDescription.append(screenshotsString)
         }
         */
        return markdownDescription
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

