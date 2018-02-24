var uglify = require('rollup-plugin-uglify')
var cjs = require('rollup-plugin-commonjs')
var resolve = require('rollup-plugin-node-resolve')
var version = require('./package.json').version
var banner =
  `/**
 * vdom v${version}
 * (c) ${new Date().getFullYear()} Ryan Liu
 * @license WTFPL
 */`

export default [{
  input: './vdom',
  output: {
    file: './dist/vdom.js',
    format: 'umd',
    name: 'vdom',
    globals: 'vdom',
    banner
  },
  plugins: [cjs(), resolve()]
}, {
  input: './vdom',
  output: {
    file: './dist/vdom.min.js',
    format: 'umd',
    name: 'vdom',
    globals: 'vdom',
    banner
  },
  plugins: [cjs(), uglify(), resolve()]
}]
