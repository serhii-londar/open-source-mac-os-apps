//
//  main.swift
//  ReadmeGenerator
//
//  Created by Serhii Londar on 4/23/19.
//  Copyright © 2019 Serhii Londar. All rights reserved.
//

import Foundation

// MARK: - Dynamic Header Generator
func generateHeader(totalApps: Int, categoriesCount: Int, languageStats: [String: Int]) -> String {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "MMMM d, yyyy"
    let lastUpdated = dateFormatter.string(from: Date())
    
    // Get top 5 languages
    let topLanguages = languageStats.sorted { $0.value > $1.value }.prefix(5)
    let languagesSummary = topLanguages.map { "\($0.key): \($0.value)" }.joined(separator: " • ")
    
    return """
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
  <p>
    <img src="https://img.shields.io/badge/Total%20Apps-\(totalApps)-blue" alt="Total Apps"/>
    <img src="https://img.shields.io/badge/Categories-\(categoriesCount)-green" alt="Categories"/>
    <img src="https://img.shields.io/badge/Last%20Updated-\(lastUpdated.replacingOccurrences(of: " ", with: "%20"))-orange" alt="Last Updated"/>
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

## 📊 Statistics

| Metric | Count |
|--------|-------|
| 📱 Total Applications | \(totalApps) |
| 📂 Categories | \(categoriesCount) |
| 🔝 Top Languages | \(languagesSummary) |

## Languages

You can see in which language an app is written. Currently there are following languages:

| Language | Icon |
|----------|------|
| C | <img src='./icons/c-16.png' alt='C' height='16'/> |
| C++ | <img src='./icons/cpp-16.png' alt='C++' height='16'/> |
| C# | <img src='./icons/csharp-16.png' alt='C#' height='16'/> |
| Clojure | <img src='./icons/clojure-16.png' alt='Clojure' height='16'/> |
| CoffeeScript | <img src='./icons/coffeescript-16.png' alt='CoffeeScript' height='16'/> |
| CSS | <img src='./icons/css-16.png' alt='CSS' height='16'/> |
| Elm | <img src='./icons/elm-16.png' alt='Elm' height='16'/> |
| Go | <img src='./icons/golang-16.png' alt='Go' height='16'/> |
| Haskell | <img src='./icons/haskell-16.png' alt='Haskell' height='16'/> |
| Java | <img src='./icons/java-16.png' alt='Java' height='16'/> |
| JavaScript | <img src='./icons/javascript-16.png' alt='JavaScript' height='16'/> |
| Lua | <img src='./icons/Lua-16.png' alt='Lua' height='16'/> |
| Objective-C | <img src='./icons/objective-c-16.png' alt='Objective-C' height='16'/> |
| Python | <img src='./icons/python-16.png' alt='Python' height='16'/> |
| Ruby | <img src='./icons/ruby-16.png' alt='Ruby' height='16'/> |
| Rust | <img src='./icons/rust-16.png' alt='Rust' height='16'/> |
| Shell | <img src='./icons/shell-16.png' alt='Shell' height='16'/> |
| Swift | <img src='./icons/swift-16.png' alt='Swift' height='16'/> |
| TypeScript | <img src='./icons/typescript-16.png' alt='TypeScript' height='16'/> |
| Metal | <img src='./icons/metal-16.png' alt='Metal' height='16'/> |

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
}

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
[metal_icon]: ./icons/metal-16.png 'Metal language.'
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
    // Optional metadata for richer README rendering
    var homebrewCask: String?
    var macOSVersion: String?  // Minimum macOS version required
    var appStoreID: String?    // Mac App Store ID for direct linking
    var deprecated: Bool?      // Mark if app is no longer maintained
    
    enum CodingKeys: String, CodingKey {
        case title
        case iconURL = "icon_url"
        case repoURL = "repo_url"
        case shortDescription = "short_description"
        case languages
        case screenshots
        case categories
        case officialSite = "official_site"
        case homebrewCask = "homebrew_cask"
        case macOSVersion = "macos_version"
        case appStoreID = "app_store_id"
        case deprecated
    }
    
    init(title: String, iconURL: String, repoURL: String, shortDescription: String, languages: [String], screenshots: [String], categories: [String], officialSite: String, homebrewCask: String? = nil, macOSVersion: String? = nil, appStoreID: String? = nil, deprecated: Bool? = nil) {
        self.title = title
        self.iconURL = iconURL
        self.repoURL = repoURL
        self.shortDescription = shortDescription
        self.languages = languages
        self.screenshots = screenshots
        self.categories = categories
        self.officialSite = officialSite
        self.homebrewCask = homebrewCask
        self.macOSVersion = macOSVersion
        self.appStoreID = appStoreID
        self.deprecated = deprecated
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
            
            // Validate applications
            let validApplications = applications.filter { app in
                let isValid = !app.title.isEmpty && !app.repoURL.isEmpty
                if !isValid {
                    print("⚠️ Warning: Skipping invalid app - Title: '\(app.title)', URL: '\(app.repoURL)'")
                }
                return isValid
            }
            
            print("📊 Total apps: \(validApplications.count), Invalid/skipped: \(applications.count - validApplications.count)")
            
            // Calculate language statistics
            var languageStats: [String: Int] = [:]
            for app in validApplications {
                for lang in app.languages {
                    let normalizedLang = normalizeLanguageName(lang)
                    languageStats[normalizedLang, default: 0] += 1
                }
            }
            
            for subcategory in subcategories {
                if let index = categories.lastIndex(where: { $0.parent != subcategory.id }) {
                    categories.remove(at: index)
                }
            }
            
            categories = categories.sorted(by: { $0.title < $1.title })
            
            // Generate header with statistics
            let header = generateHeader(
                totalApps: validApplications.count,
                categoriesCount: categories.count + subcategories.count,
                languageStats: languageStats
            )
            
            readmeString.append(header)
            print("Start iteration....")
            
            for category in categories {
                // Add category header with emoji and count
                let categoryApps = validApplications.filter({ $0.categories.contains(category.id) })
                let categoryCount = categoryApps.count
                let categoryEmoji = getCategoryEmoji(category.id)
                // Add explicit anchor for TOC linking
                let anchorId = generateAnchorId(category.title)
                readmeString.append(String.enter + "<a id=\"\(anchorId)\"></a>" + String.enter)
                readmeString.append(String.section + String.space + categoryEmoji + String.space + category.title + String.space + "(\(categoryCount))" + String.enter)
                
                var categoryApplications = categoryApps
                categoryApplications = categoryApplications.sorted(by: { $0.title.lowercased() < $1.title.lowercased() })
                
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
                    let subcategoryApps = validApplications.filter({ $0.categories.contains(subcategory.id) })
                    let subcategoryCount = subcategoryApps.count
                    let subcategoryEmoji = getCategoryEmoji(subcategory.id)
                    // Add explicit anchor for TOC linking
                    let subAnchorId = generateAnchorId(subcategory.title)
                    readmeString.append(String.enter + "<a id=\"\(subAnchorId)\"></a>" + String.enter)
                    readmeString.append(String.subsection + String.space + subcategoryEmoji + String.space + subcategory.title + String.space + "(\(subcategoryCount))" + String.enter)
                    
                    var categoryApplications = subcategoryApps
                    categoryApplications = categoryApplications.sorted(by: { $0.title.lowercased() < $1.title.lowercased() })
                    
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
            
            // Generate JSON API file for external consumers
            try generateAPIFile(applications: validApplications, categories: categoriesObject.categories, to: url)
            
            print("✅ Finish - Generated README.md and api.json")
        } catch {
            print("❌ Error: \(error)")
        }
    }
    
    // Generate a JSON API file for external consumers
    private func generateAPIFile(applications: [JSONApplication], categories: [Category], to baseURL: URL) throws {
        let apiData: [String: Any] = [
            "generated_at": ISO8601DateFormatter().string(from: Date()),
            "total_apps": applications.count,
            "total_categories": categories.count,
            "apps_by_category": Dictionary(grouping: applications, by: { $0.categories.first ?? "other" })
                .mapValues { $0.count }
        ]
        
        let jsonData = try JSONSerialization.data(withJSONObject: apiData, options: [.prettyPrinted, .sortedKeys])
        try jsonData.write(to: baseURL.appendingPathComponent("api.json"))
    }
}

// Helper function to normalize language names for statistics
func normalizeLanguageName(_ lang: String) -> String {
    switch lang.lowercased() {
    case "objective_c": return "Objective-C"
    case "cpp": return "C++"
    case "c_sharp": return "C#"
    case "coffee_script": return "CoffeeScript"
    default: return lang.capitalized
    }
}

// Helper function to generate GitHub-compatible anchor IDs from titles
func generateAnchorId(_ title: String) -> String {
    return title.lowercased()
        .replacingOccurrences(of: " / ", with: "--")  // Handle " / " like GitHub does
        .replacingOccurrences(of: "/", with: "-")
        .replacingOccurrences(of: " & ", with: "--")  // Handle " & " like GitHub does
        .replacingOccurrences(of: "&", with: "-")
        .replacingOccurrences(of: " ", with: "-")
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
            languages.append(languageIconHTML(for: lang) + " ")
        }
        
        // Header line with a standard Markdown link so it's always clickable
        // Add deprecated indicator if the app is marked as deprecated
        let deprecatedIndicator = (self.deprecated ?? false) ? " ⚠️ **[Deprecated]**" : ""
        let macOSBadge = self.macOSVersion.map { " ![macOS \($0)+](https://img.shields.io/badge/macOS-\($0)%2B-blue)" } ?? ""
        markdownDescription.append("- [\(self.title)](\(self.repoURL))\(deprecatedIndicator)\(macOSBadge) - \(self.shortDescription)\n")
        
        let indent = "  "
        // Badges are rendered directly under the title line for quick visibility
        let ownerRepo = githubOwnerRepo(from: self.repoURL)
        var badges = [String]()
        // App Store button if appStoreID is set or if officialSite points to App Store
        if let appStoreID = self.appStoreID, !appStoreID.isEmpty {
            let appStoreURL = "https://apps.apple.com/app/id\(appStoreID)"
            let appStoreButton = "<a href='\(appStoreURL)'><img src='./icons/app_store-16.png' alt='App Store' title='Download on the Mac App Store' height='16'/> App Store</a>"
            badges.append(appStoreButton)
        } else if isAppStoreURL(self.officialSite) {
            let appStoreButton = "<a href='\(self.officialSite)'><img src='./icons/app_store-16.png' alt='App Store' title='Download on the Mac App Store' height='16'/> App Store</a>"
            badges.append(appStoreButton)
        }
        // GitHub Releases badge
        if let (owner, repo) = ownerRepo {
            let releasesURL = "https://github.com/\(owner)/\(repo)/releases/latest"
            let releaseBadge = "<a href='\(releasesURL)'><img src='https://img.shields.io/github/v/release/\(owner)/\(repo)?display_name=tag&sort=semver' alt='Latest Release'/></a>"
            badges.append(releaseBadge)
            // Stars badge
            let starsBadge = "<a href='\(self.repoURL)'><img src='https://img.shields.io/github/stars/\(owner)/\(repo)?style=social' alt='GitHub stars'/></a>"
            badges.append(starsBadge)
            // Last commit badge (automatic indicator of project activity/maintenance)
            let lastCommitBadge = "<img src='https://img.shields.io/github/last-commit/\(owner)/\(repo)' alt='Last commit'/>"
            badges.append(lastCommitBadge)
            // License badge
            let licenseBadge = "<img src='https://img.shields.io/github/license/\(owner)/\(repo)' alt='License'/>"
            badges.append(licenseBadge)
        }
        // Homebrew availability badge if provided
        if let cask = self.homebrewCask, !cask.isEmpty {
            let brewURL = "https://formulae.brew.sh/cask/\(cask)"
            let brewBadge = "<a href='\(brewURL)'><img src='https://img.shields.io/badge/Homebrew-available-ebb000?logo=homebrew&logoColor=white' alt='Homebrew cask'/></a>"
            badges.append(brewBadge)
        }
        if badges.isEmpty == false {
            markdownDescription.append("\(indent)**Badges:** \(badges.joined(separator: " &nbsp; "))\n")
        }

        // Collapsible extra details (languages, screenshots) indented to belong to the list item
        markdownDescription.append("\n" + indent + "<details>\n")
        markdownDescription.append(indent + "<summary>More</summary>\n")
        markdownDescription.append(indent + "<p>\n\n")
        
        // Add languages
        markdownDescription.append("\(indent)**Languages:** \(languages)\n\n")
        
        // Add official site if available
        if !self.officialSite.isEmpty {
            markdownDescription.append("  **Website:** [\(self.officialSite)](\(self.officialSite))\n\n")
        }
        
        // Add screenshots with lazy loading to improve page load performance
        if self.screenshots.count > 0 {
            markdownDescription.append("  **Screenshots:**\n\n")
            
            // Limit to first 3 screenshots to reduce load time
            let limitedScreenshots = self.screenshots.count > 3 ? Array(self.screenshots.prefix(3)) : self.screenshots
            
            limitedScreenshots.forEach({
                markdownDescription.append("  <img src='\($0)' width='400' loading='lazy'/>\n\n")
            })
            
            // Add a note if there are more screenshots
            if self.screenshots.count > 3 {
                markdownDescription.append("  *(\(self.screenshots.count - 3) more screenshots available in the repository)*\n\n")
            }
        }
        
        markdownDescription.append(indent + "</p>\n")
        markdownDescription.append(indent + "</details>\n")
        
        return markdownDescription
    }
}

// Build HTML <img> tags for language icons to ensure rendering inside HTML blocks
private func languageIconHTML(for languageKey: String) -> String {
    struct LanguageIcon { let fileName: String; let label: String }
    let icons: [String: LanguageIcon] = [
        "c": .init(fileName: "c-16.png", label: "C"),
        "cpp": .init(fileName: "cpp-16.png", label: "C++"),
        "c_sharp": .init(fileName: "csharp-16.png", label: "C#"),
        "clojure": .init(fileName: "clojure-16.png", label: "Clojure"),
        "coffee_script": .init(fileName: "coffeescript-16.png", label: "CoffeeScript"),
        "css": .init(fileName: "css-16.png", label: "CSS"),
        "elm": .init(fileName: "elm-16.png", label: "Elm"),
        "go": .init(fileName: "golang-16.png", label: "Go"),
        "haskell": .init(fileName: "haskell-16.png", label: "Haskell"),
        "java": .init(fileName: "java-16.png", label: "Java"),
        "javascript": .init(fileName: "javascript-16.png", label: "JavaScript"),
        "lua": .init(fileName: "Lua-16.png", label: "Lua"),
        "objective_c": .init(fileName: "objective-c-16.png", label: "Objective-C"),
        "python": .init(fileName: "python-16.png", label: "Python"),
        "ruby": .init(fileName: "ruby-16.png", label: "Ruby"),
        "rust": .init(fileName: "rust-16.png", label: "Rust"),
        "shell": .init(fileName: "shell-16.png", label: "Shell"),
        "swift": .init(fileName: "swift-16.png", label: "Swift"),
        "typescript": .init(fileName: "typescript-16.png", label: "TypeScript")
    ]
    let key = languageKey.lowercased()
    if let icon = icons[key] {
        return "<img src='./icons/\(icon.fileName)' alt='\(icon.label) icon' title='\(icon.label)' height='16'/>"
    } else {
        return "<code>\(languageKey)</code>"
    }
}

// MARK: - Helpers
private func githubOwnerRepo(from repoURL: String) -> (String, String)? {
    guard repoURL.contains("github.com") else { return nil }
    let parts = repoURL.split(separator: "/").map(String.init)
    guard let owner = parts.drop(while: { $0 != "github.com" }).dropFirst().first,
          let repoRaw = parts.drop(while: { $0 != "github.com" }).dropFirst(2).first else { return nil }
    let repo = repoRaw.replacingOccurrences(of: ".git", with: "")
    return (owner, repo)
}

private func isAppStoreURL(_ string: String) -> Bool {
    return string.contains("apps.apple.com") || string.contains("itunes.apple.com")
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
    case "medical": return "🏥"
    case "menubar": return "📊"
    case "music": return "🎧"
    case "news": return "📰"
    case "notes": return "📔"
    case "other": return "📦"
    case "player": return "▶️"
    case "podcast": return "🎙️"
    case "productivity": return "⏱️"
    case "screensaver": return "🌙"
    case "security": return "🔒"
    case "sharing-files": return "📤"
    case "social-networking": return "👥"
    case "streaming": return "📡"
    case "system": return "⚙️"
    case "terminal": return "📺"
    case "touch-bar": return "🎚️"
    case "utilities": return "🛠️"
    case "video": return "🎬"
    case "vpn--proxy": return "🔐"
    case "wallpaper": return "🖥️"
    case "window-management": return "🪟"
    // Subcategories
    case "git": return "📦"
    case "ios--macos": return "📱"
    case "json-parsing": return "🔄"
    case "web-development": return "🌍"
    case "other-development": return "🔧"
    case "csv": return "📊"
    case "json": return "📋"
    case "markdown": return "📝"
    case "tex": return "📐"
    case "text": return "✏️"
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

