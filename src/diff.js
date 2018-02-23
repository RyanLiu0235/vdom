var listDiff = require('list-diff2')
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
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    // 2. both textNode and changed
    if (oldNode !== newNode) {
      _patches.push({
        type: types.TEXT,
        patch: newNode
      })
    }
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // element remain still, we'll check props and children
    // 3. props have been changed
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

    // 4. walk all the children
    var oldChildren = oldNode.children
    var childrenPatches = listDiff(oldChildren, newNode.children, 'key')
    var moves = childrenPatches.moves
    var newChildren = childrenPatches.children
    if (moves.length > 0) {
      _patches.push({
        type: types.REORDER,
        patch: {
          moves: moves
        }
      })
    }

    var leftNode = null
    var _index = index
    var oldChild, newChild
    for (var j = 0; j < oldChildren.length; j++) {
      oldChild = oldChildren[j]
      newChild = newChildren[j]

      _index += leftNode && leftNode.count ? leftNode.count : 0 + 1

      walk(oldChild, newChild, _index, patches)
      leftNode = oldChild
    }
  } else {
    // 5. element has been totally replaced
    _patches.push({
      type: types.REPLACE,
      patch: newNode
    })
  }

  if (_patches.length > 0) {
    patches[index] = _patches
  }
}

module.exports = diff
