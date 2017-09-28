# gulp-one-of

Filters [vinyl](https://github.com/gulpjs/vinyl) stream by first of possible [techs](https://en.bem.info/methodology/filestructure/#a-block-implementation-is-divided-into-separate-files).

## Installation

```sh
npm i gulp-one-of --save-dev
```

## Usage

```js
const gulp = require('gulp');
const oneOf = require('gulp-one-of');

gulp.src('blocks/*.*')
    .pipe(oneOf('post.css', 'css'))
    .pipe(gulp.dest());
```
