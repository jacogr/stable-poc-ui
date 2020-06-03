#!/us/bin/env bash

ghpages --repo https://${GH_PAT}@github.com/${GITHUB_REPOSITORY}.git --dist build --dest .
