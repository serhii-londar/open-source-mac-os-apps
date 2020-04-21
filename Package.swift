import PackageDescription

let package = Package(
  name: "MyAwesomeApp",
    dependencies: [
      .package(url: "https://github.com/nerdishbynature/octokit.swift", from: "0.9.0"),
    ]
  )
