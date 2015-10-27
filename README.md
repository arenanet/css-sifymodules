# css-sifymodules

A browserify plugin to load [CSS Modules] based on [css-modulesify]. Note: You probably don't want to use this.

## Why rewrite [css-modulesify]?

I was unhappy verbosity and number of modules included by [css-modulesify].

[CSS Modules]: https://github.com/css-modules/css-modules
[css-modulesify]: https://github.com/css-modules/css-modulesify

## Getting started

 1. Install the package: `npm install --save css-sifymodules`
 2. Use it as a plugin: `browserify -p [ css-sifymodules -o dist/main.css ] example/index.js`

## API Usage

```js
var b = require('browserify')();

b.add('./main.js');
b.plugin(require('css-sifymodules'), {
  rootDir: __dirname,
  output: './path/to/my.css'
});

b.bundle();
```

### Options:

- `rootDir`: absolute path to your project's root directory. This is optional but providing it will result in better generated classnames.
- `output`: path to write the generated css. If not provided, you'll need to listen to the `'css stream'` event on the bundle to get the output.
- `use`: optional array of postcss plugins (by default we use the css-modules core plugins).
- `generateScopedName`: (API only) a function to override the default behaviour of creating locally scoped classnames.


## License

MIT
