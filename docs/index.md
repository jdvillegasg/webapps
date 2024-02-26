# Quick review for producing this docs
* Install python package with `pip install mkdocs-material`
* `mkdocs new [dir-name]` or `mkdocs new .` Create docs for the `[dir-name]` or for this `.` project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.

# React project execution order

## Create the project with Vite
`npm create vite@latest`

## Install dependencies
`npm install`

## Run a test
Create a new Playwright project for testing the code:

`npm init playwright@latest`

Follow the CLI. It will create the folder `tests` and the file `example.spec.js` under that folder.

Run the tests:

`npx playwright test`



## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.
