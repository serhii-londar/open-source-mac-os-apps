//
//  GithubFetcher.swift
//  ReadmeGenerator
//
//  Created by Petr Korolev on 20.02.2020.
//  Copyright © 2020 Serhii Londar. All rights reserved.
//

import Foundation

class GithubFetcher {
    class func getStarsForUrl(gh_link: String) -> String {
        var name : String = ""
        do {
            let thisFilePath:String = #file
            let url = URL(fileURLWithPath: thisFilePath).deletingLastPathComponent().appendingPathComponent(FilePaths.github_token.rawValue)

            let data = try Data(contentsOf: url)
            
            
            let sema = DispatchSemaphore( value: 0 )
            
            let gh_url = NSURL(string: gh_link)
            let comp = gh_url?.pathComponents
            if let comp = comp {
                let owner = comp[1]
                name = comp[2]
                let GITHUB_TOKEN = String(decoding: data, as: UTF8.self)
                
                let config = TokenConfiguration(GITHUB_TOKEN)
                         let gh = Octokit(config)
                         gh.repository(owner: owner, name: name) { response in
                           switch response {
                           case .success(let repository):
                             stars = repository.stargazersCount
                             if let unwrapped = stars {
                                 print("\(name) : \(unwrapped)⭐️")
                             }
                             break
                           case .failure(let error):
                             print(error)
                             break
                
                           }

            } else {
                print("cant parse url: \(gh_url?.absoluteString)")
            }
            
            
            
                        
            
        }
        catch {
            print("cant fetch token")
            print(error)
        }
        
        return name
            
    }
    
}
    

