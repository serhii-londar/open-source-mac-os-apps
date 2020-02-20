//
//  GithubFetcher.swift
//  ReadmeGenerator
//
//  Created by Petr Korolev on 20.02.2020.
//  Copyright © 2020 Petr Korolev. All rights reserved.
//

import Foundation
import GithubAPI

class GithubFetcher {

    static let shared = GithubFetcher()
    var token: String

    private init() {
        token = ""
        token = self.retrieveToken()

    }

    func retrieveToken() -> String {
        do {
            let thisFilePath: String = #file
            let url = URL(fileURLWithPath: thisFilePath).deletingLastPathComponent().appendingPathComponent(FilePaths.github_token.rawValue)
            let data = try Data(contentsOf: url)
            let GITHUB_TOKEN = String(decoding: data, as: UTF8.self).trimmingCharacters(in:
            NSCharacterSet.whitespacesAndNewlines
            )
            return GITHUB_TOKEN
        } catch {
            print(error)
        }
        return ""
    }


    func getStarsForUrl(gh_link: String) -> Int? {
        var stars: Int? = nil

        do {
            
            let gh_url = NSURL(string: gh_link)
            let comp = gh_url?.pathComponents
            if let comp = comp {
                guard comp.count > 2 else {
                    return nil
                }
                let owner = comp[1]
                let name = comp[2]
                let semaphore = DispatchSemaphore(value: 0)
                RepositoriesAPI(authentication: TokenAuthentication(token: token)).get(owner: owner, repo: name) { (response, error) in
                    if let starz = response?.stargazersCount {
                        stars = starz
                    } else {
                        print(error ?? "nil error for \(String(describing: gh_url))")
                    }
                    semaphore.signal()
                }
                _ = semaphore.wait(wallTimeout: .distantFuture)
            }

            
        } catch {
            print(error)
        }
        return stars
    }
}


