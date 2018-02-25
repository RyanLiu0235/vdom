var uglify = require('rollup-plugin-uglify')
var cjs = require('rollup-plugin-commonjs')
var resolve = require('rollup-plugin-node-resolve')
var version = require('./package.json').version
var banner =
  `/**
 * seb-vdom v${version}
 * (c) ${new Date().getFullYear()} Ryan Liu
 * @license WTFPL
 */`

export default [{
  input: './vdom',
  output: {
    file: './dist/seb.js',
    format: 'umd',
    name: 'seb',
    globals: 'seb',
    banner
  },
  plugins: [cjs(), resolve()]
}, {
  input: './vdom',
  output: {
    file: './dist/seb.min.js',
    format: 'umd',
    name: 'seb',
    globals: 'seb',
    banner
  },
  plugins: [cjs(), uglify(), resolve()]
}]
