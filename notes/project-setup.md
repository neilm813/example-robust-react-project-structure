# Project setup

These are project setup steps to organize the full-stack project folders and setup prettier and ESLint

## Initial folder setup

1. Open a terminal to the folder you want your project created in.
1. `mkdir PROJECT-NAME`
1. `cd PROJECT-NAME`
1. `npm init -y`
   - To create a `package.json` that will only be used to install shared `devDependencies` for both the front-end and the back-end (packages not needed in production), such as formatters, linters, and github repo tools.
1. `mkdir src`
   - This folder convention is to separate code files from config files to de-clutter. In larger projects there is a lot of crowding from config files.
1. `cd src`
1. `mkdir api`
   - The back-end
1. `cd api`
1. `npm init -y`
   - Create a `package.json` for the back-end only packages.
1. `npm i nodemon express cors mongoose` and other initial packages your back-end depends on.
1. `cd ..`
1. `npx create-react-app client`
   - To create your front-end react app, wait until it's done, then proceed.
1. `cd client`
1. `npm i react-router-dom axios` and any other initial packages your front-end depends on.
1. `cd ..`
1. `cd ..`
1. `code .` to open VSCode to your top-level project folder.
1. Create a `README.md` file in the top-level project folder, just add a short description "This is a full-stack project for... See the README in the `client` and `api` folder for documentation about those projects."
1. There is already a `src/client/README.md` that was auto-generated which you can edit later with a short description of your front-end and to add some helpful front-end documentation notes for you and your collaborators.
1. Create this file `src/api/README.md` and add a short description. You can add helpful documentation notes here about your back-end project for you and your collaborators.

## Add project start scripts

1. Create `src/api/src/server.js` and add a `console.log('server started')` in it for now.
1. Create `src/api/index.js` and add `require('./src/server.js')` to it.
1. Open `src/api/package.json` and add this to the `scripts` property: `"start": "nodemon index.js",`
1. Open the top-level `package.json` in the PROJECT-NAME folder and add the following to the `scripts` property:

   - ```txt
      "start:api": "npm run --prefix ./src/api start",
      "start:client": "npm run --prefix ./src/client start"
     ```

   - This will allow you to start both projects (in two terminals or terminal tabs) from the top-level project folder without having to `cd` into each project. For example, from the top-level project folder test start the api with: `npm run start:api` and see if the previously added `console.log` prints.
   - You'll still want to `cd` into either the front-end or the back-end when installing packages though.

## Prettier, pre-commit format hook, and ESLint

Prettier is to format everyone's code automatically and the same way to save time formatting and make reading other people's code easier since it's all formatted consistently.

ESLint is to enforce a code-style. For example, whether destructuring should be enforced is a code-style ESLint rule, but how destructuring is formatted is a prettier rule.

Since our repo contains both projects and we want to format the code for both projects, we'll install and configure prettier as a dev only package at the top-level so it can be shared to both projects but isn't required for deployment since it's not actual code functionality.

### Install VSCode extensions

- [VSCode prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [VSCode ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Setup prettier

1. Open a terminal to the top-level project folder.
1. `npm i prettier -D` to install prettier into the project specifically as a dev only dependency.
1. Create `.prettierrc` file at the root level of the project folder. You can turn on, off, or adjust rules as you see how things are formatted and learn more about the rules:

   - ```json
     {
       "tabWidth": 2,
       "singleQuote": true,
       "printWidth": 120
     }
     ```

1. Create a `.prettierignore` file at the root level of the project folder to tell prettier what to ignore:

   - ```txt
     build
     coverage
     dist
     node_modules
     package.json
     package-lock.json
     yarn.lock
     ```

1. In VSCode with the project folder open, press Ctrl + shift or cmd + p -> Open Workspace Settings

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

1. Now when you commit your code, your staged changes will be automatically formatted without people having to run the formatter themselves so no unformatted code will make it to GitHub.

### Setup ESLint

ESLint does also have formatting capabilities and can have some rules that conflict with prettier, so we need to do additional configuration steps so it will work nice with prettier.

## Setup git and push repo

1. In the top-level project folder, create a file named `.gitignore` with the following code:

   - ```txt
      # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

      # dependencies
      /node_modules
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

1. Create and push the repo and setup a dev branch with [these steps](https://docs.google.com/document/d/1lMPkGE6j0JhF6LX_-afnoSMOvCIVueGpFfkHo23_YU0/edit#bookmark=id.wt37toty9w98)

## Setting up the cloned project

When collaborators clone the project from GitHub they need to:

1. When the project is first opened if you used the `.vscode/extensions.json` to list recommended extensions used by this project, a popup will appear once to let you install all of them together.
1. `npm i` at the top-level project folder
1. `cd client`
1. `npm i`
1. `cd ..`
1. `cd api`
1. `npm i`
1. `cd ..`
1. You can now run the project with `npm run start:api` and `npm run start:client` or if you `cd` into either of them you can use `npm start` from there.
