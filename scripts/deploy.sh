#!/usr/bin/env bash

yarn gh-pages --repo https://${GH_PAT}@github.com/${GITHUB_REPOSITORY}.git --dist build
