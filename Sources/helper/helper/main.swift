//
//  main.swift
//  helper
//
//  Created by Serhii Londar on 7/25/18.
//  Copyright © 2018 slon. All rights reserved.
//

import Foundation

func test() {
    guard let data = FileManager.default.contents(atPath: "README.md") else {
        print("Empty!!!")
        return
    }
    guard let string = String(data: data, encoding: .utf8) else {
        print("Empty!!!")
        return
    }
    let lines = string.split(separator: "\n")
    print(String(lines[1]))
}


test()
