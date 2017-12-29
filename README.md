# ffxivArchon
Homepage for FFXIV Archon FC

## Development

Prereq: Install nodejs https://nodejs.org/en/

From project root: 
1. `npm install gulp-cli -g`
1. `npm install`
1. `gulp`

Outputs build files to dist folder and automatically serves. Will refresh browser with changes when src files are modified.

## Deployment
`gulp deploy`

Builds to the dist folder and pushes contents of the build folder to the remote gh-pages branch, which is automatically build and served to http://ffxivarchon.org/.

## Domain
Added custom domain name to repo settings, added CNAME file in root, and updated DNS in google domain's Custom Resource settings.

## Google Sheets
The google api key does not work except on the ffxivarchon.org domain, so statics view will not work in a dev environment unless the permissions on the api key is changed.
