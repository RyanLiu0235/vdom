# seb-vdom [![Build Status](https://travis-ci.org/stop2stare/vdom.svg?branch=master)](https://travis-ci.org/stop2stare/vdom) [![codecov](https://codecov.io/gh/stop2stare/vdom/branch/master/graph/badge.svg)](https://codecov.io/gh/stop2stare/vdom)

An implementation of virtual DOM

## Description

Seb is mostly inspired by [simple-virtual-dom](https://github.com/livoras/simple-virtual-dom), basically a practice of my own.

## Usage

``` js
var h = seb.h // `h` helps to build vdom tree
var render = seb.render // `render` helps to render VNode to HTML document
var diff = seb.diff // `diff` helps to find differences between two trees and return the patches
var patch = seb.patch // `patch` helps to update HTML document with the patches returned by `diff`

var tree0 = h('ul', {}, [
  h('li', { key: 0 }),
  h('li', { key: 1 })
])
var tree1 = h('ul', {}, [
  h('li', { key: 1 }),
  h('li', { key: 2 }),
  h('li', { key: 0 })
])

var dom = render(tree0)
var patches = diff(tree0, tree1)
patch(dom, patches)
```