var _ = require('./utils')
var types = require('./types')

function diff(oldTree, newTree) {
  var index = 0
  var patches = {}
  walk(oldTree, newTree, index, patches)
  return patches
}

function walk(oldNode, newNode, index, patches) {
  var _patches = []

  if (newNode === null) {
    // 1. node has been removed
    _patches.push({
      type: types.REMOVE
    })
  } else if (_.isString(oldNode) && _.isString(newNode) && oldNode !== newNode) {
    // 2. both textNode and changed
    _patches.push({
      type: types.TEXT,
      patch: newNode
    })
  } else if (oldNode.tagName !== newNode.tagName) {
    // 3. element has been totally replaced
    _patches.push({
      type: types.REPLACE,
      patch: newNode
    })
  } else {
    // 4. props have been changed
    var oldProps = oldNode.props
    var newProps = newNode.props
    var allProps = Object.assign({}, oldProps, newProps)
    var propsKeys = Object.keys(allProps)

    var key
    var propsPatches = {}
    for (var i = 0; i < propsKeys.length; i++) {
      key = propsKeys[i]
      if (newProps[key] !== oldProps[key]) {
        propsPatches[key] = newProps[key]
      }
    }

    if (Object.keys(propsPatches).length > 0) {
      _patches.push({
        type: types.PROPS,
        patch: propsPatches
      })
    }

    // 5. walk all the children
  }

  patches[index] = _patches
}

module.exports = diff
