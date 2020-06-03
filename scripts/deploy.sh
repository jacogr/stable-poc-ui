#!/usr/bin/env bash

git config push.default simple
git config merge.ours.driver true
git config user.name "Github Actions"
git config user.email "action@github.com"

yarn gh-pages --repo https://${GH_PAT}@github.com/${GITHUB_REPOSITORY}.git --dist build
