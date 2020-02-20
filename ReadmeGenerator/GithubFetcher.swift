//
//  GithubFetcher.swift
//  ReadmeGenerator
//
//  Created by Petr Korolev on 20.02.2020.
//  Copyright © 2020 Serhii Londar. All rights reserved.
//

import Foundation
import GithubAPI

class GithubFetcher {
    class func getStarsForUrl(gh_link: String) -> Int? {
        var stars: Int? = nil

        do {
            let thisFilePath: String = #file
            let url = URL(fileURLWithPath: thisFilePath).deletingLastPathComponent().appendingPathComponent(FilePaths.github_token.rawValue)

            do {

                let data = try Data(contentsOf: url)

                let semaphore = DispatchSemaphore(value: 0)

                let gh_url = NSURL(string: gh_link)
                let comp = gh_url?.pathComponents
                if let comp = comp {
                    let owner = comp[1]
                    let name = comp[2]
                    let GITHUB_TOKEN = String(decoding: data, as: UTF8.self)
                    let authentication = TokenAuthentication(token: GITHUB_TOKEN)
                    let api = RepositoriesAPI(authentication: authentication)
                    //                  RepositoriesAPI.init().get(owner: owner, repo: name) { (response, error) in
                    api.get(owner: owner, repo: name) { (response, error) in

                        if let starz = response?.stargazersCount {
                            stars = starz
                        } else {
                            print(error ?? "nil error for \(gh_url)")
                            
                        }
                        semaphore.signal()
                    }
                }

                _ = semaphore.wait(wallTimeout: .distantFuture)
            } catch {
                print(error)
            }
        }
        return stars

    }
}

