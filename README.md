# simplest-db

Small synchronous database implementation for node.js and browsers.

[![NPM](https://nodeico.herokuapp.com/@allnulled/simplest-db.svg)](https://www.npmjs.com/@allnulled/simplest-db)

## 1. Installation

```sh
~$ npm i -s @allnulled/simplest-db
```

## 2. How it works

This script works the same for `node.js` and `browser`.

What the script is thought for, is to be used as `synchronous database` for both `javascript` environments.

On the `node.js` side, it works with files and the `require("fs")` API.

On the `browser` side, it works with `localStorage` API.

## 3. Usage

### 3.1. Install:

In node.js you rely on `require` function and the `node_modules` of the `npm`.

In browser you need to import `simplest-db.js` by a script tag like:

```html
<script src="/path/to/some/cdn/network/and/find/simplest-db.js"></script>
```

If case you use `webpack` or `browserify` or some tool to pack your browser scripts, you can use `import` and `require` syntax too with `"simplest-db"` parameter.

### 3.2. Import:

In node.js:

```js
const SimplestDB = global.SimplestDB || require("@allnulled/simplest-db");
```

In browser:

```js
const SimplestDB = window.SimplestDB;
```

Note: the `import` syntax of ES6 will also work.

### 3.3. Create database:

```js
const db = SimplestDB.create({
    schema: "Unique schema id",
    attributes: { /* custom schema attributes */ },
    tables: {
        fichero: {
            attributes: { /* custom table attributes */ }.
            columns: {
                ruta: {
                    attributes: { /* custom column attributes */ },
                    is_type: "string",
                }
            }
        }
    }
});
```

### 3.4. Insert into database:

```js
db.insert("fichero", {
    ruta: "/root/index.js",
    contenido: "console.log('hi!!!')"
});
```

### 3.5. Select from database:

```js
db.select("fichero", f => {
    return f.ruta && f.ruta.startsWith("/root/");
});
```

### 3.6. Update from database:

```js
db.update("fichero", 1, {
    contenido: "console.log('bye!')"
});
```

### 3.7. Delete from database:

```js
db.delete("fichero", 1);
```

## 4. Features

Some **enjoyable** features:

- Fully synchronous API.
- Browser (`localStorage`) and node.js (`require("fs")`) support.

Some **missing** features:

- NO support for automatic column checkings, only for table checking. To do so, override `validateRow` method.

### 4.1. Extra features

Since version `1.0.3`, `@allnulled/simplest-db` comes with 2 extra APIs: **Cache API** and **Filesystem API**.

The **Filesystem API**:

- Included API for files at: `SimplestDB.getFS()`.
  - Contains a `SimplestDB` instance with `"system"` as schema (so: `./sdb_modules/system.data.json` or `localStorage.SDB_STORAGE_FOR_system`).
  - Accepts tables: `fs`.
  - Accepts columns: `fs.path`, `fs.contents`, `fs.metadata`.

The **Cache API**:

- Included API for cache at: `SimplestDB.getCache()`.
  - Contains a `SimplestDB` instance with `"system"` as schema too (so also: `./sdb_modules/system.data.json` or `localStorage.SDB_STORAGE_FOR_system`).
  - Accepts tables: `cache`.
  - Accepts columns: `cache.key`, `cache.value`.

## 5. License

No license.

## 6. Why?

To have another awesome javascript database. Synchronous. Light. Simpler.