#!/usr/bin/env bash

git config --global push.default simple
git config --global merge.ours.driver true
git config --global user.name "Github Actions"
git config --global user.email "action@github.com"

yarn gh-pages --repo https://${GH_PAT}@github.com/${GITHUB_REPOSITORY}.git --dist build
