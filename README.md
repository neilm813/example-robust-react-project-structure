# Example full-stack react project structure

## Back-end

[src/api](./src/api/)

### ES6 modules enabled

The [src/api/package.json](./src/api/package.json) has `"type": "module"` to enable ES6 modules (`import` / `export` syntax).

This makes `require` unusable now.

Since the back-end doesn't have webpack configured like `create-react-app` does automatically, some ES6 module syntax is slightly different, such as:

- needing to add `.js` in `from './fileName.js'`
- needing to specify `from 'folder/index.js` instead of it automatically looking for `index.js`
- needing to load `dotenv` differently so the env vars are available before other modules are loaded (see [./src/api/src/main.js](./src/api/src/main.js))
