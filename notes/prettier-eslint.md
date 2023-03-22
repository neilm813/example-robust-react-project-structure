# Configuring ESlint and prettier

## Intro

Prettier & ESLint are almost always used in a professional to enforce consistent code formatting and style because it's easier and more productive to work on a project that has a consistent style and format even though individuals have their separate personal preferences. It also saves time, instead of arguing over the code format and style or formatting by hand, the rules are agreed upon up-front or imported from a popular style guide.

Installing prettier and ESLint into a project is how this is enforced, because individual's can have personal prettier and ESLint settings in their VSCode, but when VSCode sees prettier and ESLint configs in a project, it will use those instead.

It can be overwhelming trying to use both prettier and ESLint together if it's your first time trying either, so you may want to try just prettier first and then try adding both later.

### Prettier vs ESLint

The confusing part is that ESLint can also format code, but it's more popular to delegate that to prettier instead, so then what is the difference?

Examples:

The decision to enforce destructuring is a code-style choice that will be enforced by ESLint, but the way destructuring is formatted is handled by prettier.

The decision to enforce using arrow functions for components is a code-style choice that will be enforced by ESLint, but the way arrow functions and regular functions are formatted is handled by prettier.

### Formatting and style automation

Installing prettier and ESLint into a project also provides the opportunity to set up some automation, like a pre-commit hook which will be discussed later: in short, every time a dev commits, their staged files with changes will automatically be formatted and linted based on the project's rules.

## Install VSCode extensions

Install the VSCode extensions.

- [VSCode prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [VSCode ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Project folder assumptions

This setup is designed for when a front-end and back-end project are housed in the same repo.

- Project folder
  - `package.json`
    - This `package.json` should have been created with `npm init -y` in the top-level project folder which will **ONLY** be used to install shared dev dependencies (not needed for deployment) such as formatters and linters. When opened it should only have `devDependencies` and not any `dependencies`. Be sure to cd into `api` or `client` when installing front-end or back-end packages.
  - `src`
    - `api`
      - This is the server project, in this folder `npm init -y` should have been ran to create a `package.json` for the back-end only packages
    - `client`
      - This is the react app which should automatically have a `package.json` for front-end only packages

## Prettier only

1. cd into your top-level project folder (the folder that your server AND client are inside of)
1. If there is no `package.json` there, use `npm init -y` to create one
1. `npm i prettier -D` install prettier into the project specifically as a dev only dependency.
1. Create `.prettierrc` file at the root level of the project folder. You can turn on, off, or adjust rules as see how things are formatted and learn more about the rules:

   - ```json
     {
       "tabWidth": 2,
       "singleQuote": true
     }
     ```

1. Create a `.prettierignore` file at the root level of the project folder:

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

   - This is optional but it can be helpful for code to be formatted as you save files so you never need to manually run a format command to format your code as you finish blocks of code

1. That's it, now anyone who runs `npm i` after cloning the project will have prettier installed into the project and should install the VSCode prettier extension to work with the prettier config files.

## Husky pre-commit git hook

Follow [Option 2](https://prettier.io/docs/en/precommit.html#option-2-pretty-quickhttpsgithubcomazzpretty-quick) in the prettier docs to install and configure husky to automatically format any staged file that is being committed to make sure no un-formatted code makes it into the repo.

If you add ESLint, after, you can add another line to `.husky/pre-commit` if you want to run some lint commands on pre-commit as well.

## ESLint and prettier (React specific)

1. Follow the prettier installation steps above first
1. Open the terminal to the project's root folder
1. `npm install eslint --save-dev`
   - install ESLint into the project so it's not only on your machine
1. `npx eslint --init` or `npm init @eslint/config`
   - initialize an ESLint config in the project
1. Select `To check syntax, find problems, and enforce code style`
1. Select `JavaScript modules (import/export)`
   - For full-stack, you'll want to configure `import/export` in your back-end so you can use it there too with `"type": "module"` in the back-end `package.json` but when using `import` in the back-end you'll need to include the file extensions without additional configuration.
1. Select `React`
1. Select `No`
1. Select `Browser` (full-stack: select both)
1. Select `Use a popular style guide`
1. Select `Airbnb`
1. Select `JSON`
1. Select `Yes`
1. Select `npm`
   - `.eslintrc.json` was created
1. Optionally add ESLint project workspace VSCode settings ctrl + shift or cmd + p -> Open Workspace Settings

- ```json
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
  ```

1. `npm i prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks -D`
   - Install prettier and ESLint-prettier compatibility packages into the project
1. In `.eslintrc`: add to `extends`, `plugins` and `rules` or replace the whole file with the below snippet

   - ```json
     {
       "root": true,
       "env": {
         "browser": true,
         "es2021": true
       },
       "extends": ["plugin:react/recommended", "plugin:react-hooks/recommended", "airbnb", "prettier"],
       "overrides": [],
       "parserOptions": {
         "ecmaVersion": "latest",
         "sourceType": "module"
       },
       "plugins": ["react", "prettier"],
       "rules": {
         "react/prop-types": ["off"],
         "react/react-in-jsx-scope": "off",
         "react/jsx-props-no-spreading": ["off"],
         "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
         "import/prefer-default-export": "off",
         "react/function-component-definition": [
           "error",
           {
             "namedComponents": "arrow-function",
             "unnamedComponents": "arrow-function"
           }
         ],
         "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
         "prefer-destructuring": [
           "warn",
           {
             "array": true,
             "object": true
           },
           {
             "enforceForRenamedProperties": false
           }
         ]
       }
     }
     ```

Because of an ESLint rule we added to enforce using arrow functions for components, you'll now need to change the `App.js` function component into an arrow function. This setting has no benefit except adding consistency to the style of how components are written.

### Test

Create `test.js`:

```js
for (let i = 0; i < 5; i++) {
  console.log(5);
}
```

Notice `i++` is underlined in red. Hover over it and click the `eslint(no-plusplus)` link to find out why the rule exists, it exists for a reason so we will either learn about why we want to keep it, or come away feeling like it's too strict and want to disable it, or partially disable it. To avoid `++` we need to use `+= 1`.

You can disable it just for `for` loops if you want per the documentation by adding to the `rules` of `.eslintrc.json`: `"no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],`

## Additional full-stack notes

You can separate your ESLint react rules from your back-end ESLint rules by creating separate `.eslintrc.json` files.

Create `client/.eslintrc.json` and extend your main `.eslintrc.json`:

```json
{
  "extends": [
    "../../.eslintrc.json"
  ],
  "rules": {}
```

Now move all the react specific rules from the `.eslintrc.json` at root level of the project to the `client/.eslintrc.json` file.

Make sure your the `.eslintrc.json` at the root of your project has `"root": true,` to let ESLint know it is the parent `.eslintrc.json` config.
