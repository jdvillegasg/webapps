# Install frameworks, tools and libraries

## Material for mkdocs

- Install the python package

```bash
pip install mkdocs-material
```

- Create the mkdocs for the folder

```bash
mkdocs new [dir-name]
```

or

```bash
mkdocs new .
```

- Start the live-reloading docs server

```bash
mkdocs serve
```

- Build the documentation site

```bash
mkdocs build
```

## React using Vite

- Create the project

```bash
npm create vite@latest
```

- Once under the folder, install the dependiencies for the project

```bash
npm install
```

## Run a test with Playwright

- Create a new Playwright project for testing the code

```bash
npm init playwright@latest
```

- Follow the CLI. It will create the folder `tests` and the file `example.spec.js` under that folder.

- Run the tests

```bash
npx playwright test
```

## Tailwind with Vite and React

- Under the folder of the created project run

```bash
npm install -D tailwindcss postcss autoprefixer
```

- Create a tailwind config file

```bash
npx tailwindcss init -p
```

- Add in your config file

!!!tip "Configure template paths"
    ```js
    /** @type {import('tailwindcss').Config} */
        module.exports = {
        content: [
            "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
        }
    ```

- Add tailwind directives in the `index.css` file

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Shadcn with Vite and React

- Create a `jsconfig.json` file (if using TypeScript the file will be named `tsconfig.json`) and add the following contents:
  
!!! tip "Create jsconfig.json"
    ```js
    {
        "compilerOptions": {
            // ...
            "baseUrl": ".",
            "paths": {
            "@/*": [
                "./src/*"
            ]
            }
                // ...
        }
    }
    ```

!!! success "Prettier with Markdown"
    If you have the "Prettier" extension for VS Code, add a `.prettierignore`file at the root of your project/s and add the files or folders you don't want "Prettier" to format. For example, in this case, all this documentation folder have been added to the `.prettierignore` file, so that it doesn't format Markdown by default.

- Update the `vite.config.js` file by adding modifications shown as follows:

!!! tip "Update vite.config.js"
    ```js
    import path from "path"
    import react from "@vitejs/plugin-react"
    import { defineConfig } from "vite"
    
    export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
        "@": path.resolve(__dirname, "./src"),
        },
    },
    })
    ```

- Run `npx shadcn-ui@latest init` and follow the CLI.

- Install the components you want to install: i.e. `npx shadcn-ui@latest add button label`

## Test packages

To test your applications the following packages might be useful:

`vitest`

Run `npm install vitest -D` and then modify the `package.json`file of your project to include the `test` key and the value `vitest`under the `scripts` key.

`happy-dom`

Provides a headless-alike-browser. After installing it with `npm install happy-dom`, go to `vite.config.js`file and after the `plugin` key add the following snippet:

```js
test: {
    environment: "happy-dom",
  },
```

`testing-library`

Utilities library to test applications. Install it by executing `npm install @testing-library/react`.

# Install eslint with typescrit

Execute `npx eslint --init`