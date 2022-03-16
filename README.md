# simplest-db

[![NPM](https://nodei.co/npm/simplest-db.png?stars&downloads)](https://www.npmjs.com/package/simplest-db)

Small synchronous database implementation for node.js and browsers.

## 1. Installation

```sh
~$ npm i -s simplest-db
```

## 2. How it works

This script of 270 lines approx. works the same for `node.js` and `browser`.

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
const SimplestDB = global.SimplestDB || require("simplest-db");
```

In browser:

```js
const SimplestDB = window.SimplestDB;
```

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

## 4. License

No license.

## 5. Why?

To have another awesome javascript database. Synchronous. Light. Simpler.