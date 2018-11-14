#!/bin/bash

set -e

if [[ $TRAVIS_BRANCH != 'readme-generation' ]]
then
  echo 'exit'
  exit
fi

git checkout readme-generation

git config user.name "serhii-londar"
git config user.email "serhii.londar@gmail.com"

git status

echo add readme
git add README.md

echo commit
git commit -m "Generate README"

echo push
git push --quiet "https://${DANGER_GITHUB_API_TOKEN}@github.com/serhii-londar/open-source-mac-os-apps.git"  readme-generation:readme-generation > /dev/null 2>&1
