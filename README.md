# Example full-stack react project structure

This project serves as an example of how to structure a full-stack react project with an explanation of the choices made below.

[See initial project creation steps here](./notes/project-setup.md) and then read the rest of this to understand the rationale behind the rest of the project structure and choices.

## TypeScript Note

As you start building larger projects, TypeScript (TS) becomes more necessary to keep the bugs at bay and have a good developer experience (DX). This example doesn't use TS because it is meant to be more of a stepping stone example.

## Folder structure and conventions

### src folders

`src` folders are a per app, package, or lib convention to help organize and separate _source code_ files from all the configuration files that quickly add up and could clutter your code files if not separated.

In this case, we have three `src` folders, one for our project as a whole to separate the two apps from the top-level config files, then one in each app `client` and `api` to separate each app's code files from their own configuration files.

### index files

Index files have a few advantages:

1. Clarity and privacy: the `index.js` specifies what code from the folder is available to be imported from outside the folder (clear distinction between public vs internal code)
   - Some code may be intended only for use within the folder and therefore should not be exported / imported
1. Consistency: imports don't need to specify any file other than the `index.js`
1. DRY: everything that can be imported from a folder is available in a single import statement since the `index.js` collects and exports everything
   - Depending on how the project is configured, you may not even need to explicitly refer to the `index.js` because it will be automatically searched for if only the folder name is used (such as in create-react-app)

### views folder

The [views](./src/client/src/views) folder is for any component that has a route / path associated to it, these components represent a view (page) and usually build the page by using other non-view components.

### components folder

The [components](./src/client/src/components) folder is for components that do not have a route / path associated to them, these components do not represent a full view (page).

Each component itself is a folder so files related to the component can be grouped with the component, such as css module files, or smaller components that may only be used in a single larger component.

### utils folder

`utils` is just a folder name convention to follow separation of concerns and decouple logic to make code more reusable, usually in the form of small helper functions and classes.

In react, [utils](./src/client/src/utils) is code that isn't a component or a hook, but multiple components may need to utilize it.

In the server, [utils](./src/api/src/utils) is basically any reusable code that isn't part of a more specific folder convention such as models, controllers, services, and middleware.

### services folder

`services` is another folder name convention to follow separation of concerns and decouple logic to make code more reusable. Services are usually more specifically focused around decoupling API and database request logic whereas the utilities folder is for other reusable code.

In our react front-end, [internalApiService](./src/client/src/services/internalApiService.js) contains all the logic for calling our api that can be reused in any component that needs to make an api call to our own back-end.

Our backend [services](./src/api/src/services) contains all the database logic so it can be easily reused in multiple controller handlers / routes if needed. Another service file could be added if our server needs to make calls to some 3rd party api.

The below images diagram what adding a service layer to the back-end MVC looks like:
![mvc with no service](./notes/assets/images/mvc/mvc-diagram.png)
![mvc with service](./notes/assets/images/mvc/mvc-with-service-diagram.png)

### assets folder

The [assets](./src/client/src/assets) folder is for storing static assets, such as images.

### hooks folder

The [hooks](./src/client/src/hooks) folder is for saving custom hooks that are used by multiple components. Sometimes, it helps for organization to create a hook that is only used by a single component, in this case the hook can be placed in the component's folder itself.

## ES6 modules

Our back-end doesn't already come with webpack and babel configured like create-react-app does, so those would need to be setup in order to use `import` and `export` in the back-end in the same way they are used in the front-end.

However, a simpler alternative is to add `"type": "module"` to [src/api/package.json](./src/api/package.json). With this added, we can use `import` and `export` with the below caveats:

- `require` is no longer available
- must add `.js` in `from './fileName.js'`
- must specify `from 'folder/index.js` instead of it automatically finding the folder's `index.js`
- must load `dotenv` differently so the env vars are available before other modules are loaded (see [./src/api/src/main.js](./src/api/src/main.js))
- must use `assert` to import JSON files: `import json from './foo.json' assert { type: 'json' };`

## Named vs default imports / exports

Named imports and exports are used wherever possible instead of defaults to provide consistency.

Many popular packages use default imports, so they are fine to use. However, it can be a bit confusing when there are multiple ways to import the same code and when the chosen name for the import can be anything.

You can only have one default export per file, and when importing it, you can choose any name for it which can make it harder to search the codebase to find all the places that particular code is imported.

Named imports must specify the exact name of the export and you can have as many named exports as needed. You can still rename a named import, but only after explicitly referencing the name.

## Installed packages

### client

### [react-query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)

React query is one of the most popular packages for handling api calls in react because it helps with a lot of the pain points of doing so, such as caching the data so you don't have to worry about a separate components performing the same fetch that was already done.

A small example of react-query in the code is [here](./src/client/src/views/OneDestination/OneDestination.js)

### [react-hook-form](https://react-hook-form.com/)

React-hook-form is gaining popularity for making improvements when compared to the other most popular react form libraries.

### [MUI](https://mui.com/)

Material UI by Google is one of the most popular component UI libraries to save a lot of styling time, once you get used to it. There are many other good component libraries as well. Some people also prefer to just use a CSS library like tailwind and just use the classes to create their styled components.

## node_modules

Each distinct app has it's own `node_modules` (`client` and `api`) so each separate app is self-contained, knowing what packages it depends on and needs to install for it to work on it's own. Since `client` communicates with `api` only through HTTP requests, these two apps can be deployed on separate servers if needed, which means they each need their own `node_modules` to work separately.

### Top-level node_modules

There is a `node_modules` at the top-level of the project and a top-level [package.json](./package.json) for some `devDependencies` that are used for the whole repo but are not used in production. Do not install packages here that are actually used in your code, e.g., don't install `axios` here to share it with `client` and `api`, install it in both places instead so each app is standalone. `node_modules` can be shared if you use a more robust monorepo approach.

The kinds of `devDependencies` that can be installed here are things like prettier formatter, ESLint, and git automation tools like `husky` which can be used to automatically use prettier to format code every time a `git commit` happens (pre-commit hook). Since the git repo is the whole project, that means git hooks and enforcing formatting throughout the whole repo would be managed at this top-level.

## Config files

### Node version

The `"engines"` key can be used in `package.json` and a [.npmrc](./.npmrc) file can be used to help collaborators know what version of node they should be using for this project.

You should use Node Version Manager (nvm) because it makes it very easy to switch node versions since different projects you work on may have been created at different times with different node versions.

### .env files

The `.env` files are ignored via the project's [.gitignore](./.gitignore) so it applies to both the `client` and `api` projects.

`.env` files are for storing environment variables that may need to change between developers and environments (dev / prod). Some developers may have different test db names they need to use, and that may be different than the db name in prod for example.

[client env example](./src/client/.env.example) and [api env example](./src/api/.env.example) are files to guide collaborators on how to create their own `.env` file for these projects since the actual `.env` file is ignored.

### editorconfig

This file [.editorconfig](./.editorconfig) helps synchronize collaborator's editor settings for consistency.

### .vscode folder

This file contains project-specific VSCode settings that to share between collaborators, such as [settings.json](./.vscode/settings.json) for known words that spell-checkers can ignore and some other recommended settings.

The [extensions.json](./.vscode/extensions.json) lists out all the extensions that are recommended for the project, for example, if you write some special comment syntax so an extension colors the comments, you would include the name of that extension here. You can right click an extension to copy it's name-id.

## Running this project

1. clone it
1. open the cloned project folder in a terminal or open VSCode to the project and open the integrated terminal
1. `npm i` to install top-level project `devDependencies`
1. `cd client`
1. `npm i` to install client app dependencies
1. open another terminal and `cd api`
1. `npm i` to install api app dependencies
1. cd back to the root of the project
1. `npm run start:api` in one terminal
1. `npm run start:client` in another terminal
   - see the project root's [package.json](./package.json) `scripts` section. The `start:api` script simply runs the `start` script that is in the [api package.json](./src/api/package.json) `scripts` section and the same for `start:client` so that you don't have to cd into both if you just want to start them.
