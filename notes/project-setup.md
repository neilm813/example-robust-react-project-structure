# Project setup

These are steps to setup a project with this structure and configure prettier with ESLint and a pre-commit format hook.

## Create git repo and gitignore

1. Create a new folder for this project, which I'll refer to as "top-level project folder".
1. Create a file called `.gitignore` and add the following code to it:

   - ```txt
         # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

         # dependencies
         node_modules
         /.pnp
         .pnp.js

         # testing
         /coverage

         # production
         /build

         # misc
         .DS_Store
         .env
         .env.local
         .env.development.local
         .env.test.local
         .env.production.local

         npm-debug.log*
         yarn-debug.log*
         yarn-error.log*
     ```

1. Create a GitHub repo and push just the `.gitignore` file to it for now. See this [Git Cheat sheet](https://docs.google.com/document/d/1lMPkGE6j0JhF6LX_-afnoSMOvCIVueGpFfkHo23_YU0/edit#heading=h.a6e19ybms546) and follow the `dev` branch creation steps as well.
   - Read about the git branching strategy in this document later as a team.
1. Open VSCode to your top-level project folder and create the below folders and files, leave the files empty for now.

   - ```txt
     .
     └── project-folder/
         ├── README.md
         ├── .gitignore
         └── apps/
             └── api/
                 ├── index.js
                 └── src/
                     ├── README.md
                     └── server.js
     ```

1. Open the VSCode integrated terminal which will open to the top-level project folder, or open a separate terminal to that location.
1. `npm init -y`
   - To create a `package.json` that will be used later to install only shared `devDependencies` for used by both the front and the back-end (packages not needed in production), such as formatters, linters, and other automation.
1. `cd apps`
1. `cd api`
1. `npm init -y`
   - Open the newly created `apps/api/package.json` and add `"type": "module"` to it which will enable `import` syntax in the back-end. However, unlike in react you'll have to add the file extension like so: `import { x } from './folder/file.js'`
1. `npm i nodemon express cors mongoose` or whatever initial packages your back-end depends on.
1. `cd ..`
1. `npx create-react-app client`
   - Wait until it's done and then proceed.
1. `cd client`
1. `npm i react-router-dom axios` or whatever initial packages your front-end depends on.
1. `cd ..`
1. `cd ..`
1. In `apps/api/src/server.js` add `console.log('server started');` for now.
1. In `apps/api/index.js` add `import './src/server.js'`

## Add project start scripts

1. Open `apps/api/package.json` and add this to the `scripts` object: `"start": "nodemon index.js",`
1. Open the `package.json` in the top-level project folder and add the following to the `scripts` object:

   - ```txt
      "api:start": "npm run --prefix ./apps/api start",
      "client:start": "npm run --prefix ./apps/client start"
     ```

   - This will allow you to start both projects (in two terminals or terminal tabs) from the top-level project folder without having to `cd` into each project. For example, from the top-level project folder test start the api with: `npm run start:api` and see if the previously added `console.log` prints.
   - You'll still want to `cd` into either the front-end or the back-end when installing packages though.

## Prettier, pre-commit format hook, and ESLint

Prettier is to format everyone's code automatically and the same way to save time formatting and make reading other people's code easier since it's all formatted consistently.

ESLint is to enforce a code-style. For example, whether components should be arrow functions is a style choice enforced by ESLint rules, but how arrow functions are formatted is enforced by prettier rules.

Since our repo contains both projects and we want to format the code for both projects, we'll install and configure prettier as a dev only package at the top-level so it can be shared to both projects but isn't required for deployment since it's not actual code functionality.

### Setup prettier

1. Install the [VSCode prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
1. Open a terminal to the top-level project folder.
1. `npm i prettier -D` to install prettier into the top-level `package.json` as a dev only dependency.
1. Create a `.prettierrc` file at the top-level project folder and add the below code. You can turn on, off, or adjust rules as you see how things are formatted and learn more about the rules:

   - ```json
     {
       "tabWidth": 2,
       "singleQuote": true,
       "printWidth": 120
     }
     ```

1. Create a `.prettierignore` file at the top-level project folder to tell prettier what to ignore:

   - ```txt
     build
     coverage
     dist
     node_modules
     package.json
     package-lock.json
     yarn.lock
     ```

1. In VSCode with the project folder open, press Ctrl or cmd + shift + p -> Open Workspace Settings (JSON) and add:

   - ```json
     {
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "editor.formatOnSave": true,
       "files.autoSave": "onFocusChange"
     }
     ```

   - This is optional to auto-format files on save and auto-save files.

### Add husky pre-commit git hook

1. From a terminal open to the top-level project folder, run the following:

   - ```txt
     npx husky-init
     npm install --save-dev pretty-quick
     npx husky set .husky/pre-commit "npx pretty-quick --staged"
     ```

1. You should see a `.husky/pre-commit` file and folder now with the `npx pretty-quick --staged` code in it which will run prettier on all staged files when committing. If formatting fails because of syntax errors the commit won't go through. Committing will take longer now since more is happening.

### Setup ESLint

Install the [VSCode ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

ESLint does also have formatting capabilities and can have some rules that conflict with prettier, so we need to do additional configuration steps so it won't fight prettier.

1. Only do these steps if the above prettier installation steps are finished.
1. Open the terminal to the top-level project folder.
1. `npm install eslint --save-dev`
   - This installs ESLint into the project so it's not only on your machine
1. `npx eslint --init` or `npm init @eslint/config`
   - `y` to proceed
   - This initialize an ESLint config in the project
1. Select `To check syntax, find problems, and enforce code style`
1. Select `JavaScript modules (import/export)`
   - For full-stack, you'll want to configure `import/export` in your back-end so you can use it there too with `"type": "module"` in the back-end `package.json` but when using `import` in the back-end you'll need to include the file extensions without additional configuration.
1. Select `React`
1. Select `No`
1. Select both Browser and Node for full-stack
1. Select `Use a popular style guide`
1. Select `Airbnb`
1. Select `JSON`
1. Select `Yes`
1. Select `npm`
   - `.eslintrc.json` should now be created
1. Optionally add ESLint project workspace VSCode settings ctrl or cmd + shift + p -> Open Workspace Settings (JSON) and add:

- ```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
  ```

1. `npm i prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks -D`
   - Install ESLint-prettier compatibility packages.
1. Replace everything in `.eslintrc` with the below code which mostly adds to `extends`, `plugins`, and adds some `rules`:

   - ```json
     {
       "root": true,
       "env": {
         "browser": true,
         "es2021": true,
         "node": true
       },
       "extends": ["plugin:react/recommended", "plugin:react-hooks/recommended", "airbnb", "prettier"],
       "overrides": [],
       "parserOptions": {
         "ecmaVersion": "latest",
         "sourceType": "module"
       },
       "rules": {
         // You shouldn't console log to the browser things that users shouldn't see. Remove this to be reminded to remove
         // your logs so they don't end up in production.
         "eslint no-console": "off",
         "max-classes-per-file": "off",
         // File extensions are required on import statements in the back-end if import syntax is enabled via package.json
         // "type": "module". This rule can be removed if import syntax is not used in the back-end.
         "import/extensions": "off",
         "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
         "import/prefer-default-export": "off",
         "no-unused-vars": [
           "warn",
           {
             "argsIgnorePattern": "^_",
             "varsIgnorePattern": "^_",
             "vars": "all",
             "args": "after-used",
             "ignoreRestSiblings": false
           }
         ],
         "prefer-destructuring": [
           "warn",
           {
             "array": true,
             "object": true
           },
           {
             "enforceForRenamedProperties": false
           }
         ],
         "react/prop-types": ["off"],
         "react/react-in-jsx-scope": "off",
         "react/jsx-props-no-spreading": ["off"],
         "react/jsx-filename-extension": [
           "warn",
           {
             "extensions": [".js", ".jsx"]
           }
         ],
         "react/function-component-definition": [
           "error",
           {
             "namedComponents": "arrow-function",
             "unnamedComponents": "arrow-function"
           }
         ]
       }
     }
     ```

### Test ESLint

In `apps/client/app.js` you should see the `App` function underlined in red and when hovered it says: "Function component is not an arrow function" because of the rule:

```json
"react/function-component-definition": [
  "error",
  {
    "namedComponents": "arrow-function",
    "unnamedComponents": "arrow-function"
  }
]
```

Convert it to an arrow function to satisfy the rule, and then a different error appears on hover: "Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`" with a link to the [arrow-body-style](https://eslint.org/docs/latest/rules/arrow-body-style) rule which explains this enforces shorthand arrow notation when possible and shows different possible settings you can add.

### ESLint staged pre-commit

Optionally, you can also run ESLint on every commit which means the commit will fail until ESLint rules are followed correctly.

1. Open a terminal to the top-level project folder.
1. `npm i lint-staged -D`.
1. Open the `package.json` at the top-level project folder and add this inside the first set of curly braces:

   - ```json
     "lint-staged": {
       "**/*.{js,jsx,ts,tsx}": [
         "eslint --fix"
       ]
     }
     ```

1. In `.husky/pre-commit` add this as a new line: `npx lint-staged`
1. Your commits will take even longer now but more is being automatically checked.

## Editor config and recommended extensions

Collaborators may install VSCode extensions they use in the project, such as Better Comments to enable some nice highlighting on comments, but other developers won't benefit unless they know this extension is used.

Create the following file and add the below code: `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "aaron-bond.better-comments",
    "DavidAnson.vscode-markdownlint",
    "dbaeumer.vscode-eslint",
    "EditorConfig.EditorConfig",
    "esbenp.prettier-vscode",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

Now when someone clones the repo, the first time they open it, a popup will appear **one time** to ask if you want the recommended extensions installed all at once. Tell your teammates to click yes.

You as the project creator will need to install the above extensions yourself that you don't already have installed.

In the extensions panel you can right click an extension to copy it's id to be used in this file.

The `"streetsidesoftware.code-spell-checker"` will spell check your code and if there is a word it doesn't recognize you should use the light bulb to "add word to workspace settings" and it will then appear in [settings.json](../.vscode/settings.json) under `"cSpell.words"`.

- At the top-level project folder create a file called `.editorconfig` and add the below code which helps synchronize some people's code editor settings that can differ between operating systems and computers:

  - ```txt
    # Editor configuration, see http://editorconfig.org
    root = true

    [*]
    charset = utf-8
    end_of_line = lf
    indent_style = space
    indent_size = 2
    insert_final_newline = true
    trim_trailing_whitespace = true

    [*.md]
    max_line_length = off
    trim_trailing_whitespace = false
    ```

- Make sure you install the Editor Config extension now, others will get it if they click yes to install recommended settings when they first open the repo.

## Push project setup changes

Add all your changes and make a commit message, such as `"initial project setup"` and push to the `dev` branch that you should have created at the beginning.

## Ready for cloning

Now the repo is ready to be cloned and after cloning the below steps need to be followed:

1. When the project is first opened if you used the [extensions.json](../.vscode/extensions.json) to list recommended extensions used by this project, a popup will appear once to let you install all of them together.
1. `npm i` at the top-level project folder
1. `cd apps/client`
1. `npm i`
1. `cd ..`
1. `cd apps/api`
1. `npm i`
1. `cd ..`
1. `cd ..`
1. You can now run the project with `npm run start:api` and `npm run start:client` or if you `cd` into either of them you can use `npm start` from there.

Anytime new packages are installed by anyone, everyone needs to `npm i` where they were installed to get them.
