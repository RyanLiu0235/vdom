var types = require('./types')
var render = require('./render')
var _ = require('./utils')

function patch(oldDom, patches) {
  var count = 0
  walk(oldDom, patches, count)
}

function walk(oldDom, patches, count) {
  var currentPatch = patches[count]

  if (!_.isString(oldDom)) {
    var children = oldDom.childNodes
    for (var j = 0; j < children.length; j++) {
      walk(children[j], patches, ++count)
    }
  }
  if (currentPatch) {
    for (var i = 0; i < currentPatch.length; i++) {
      handlePatch(oldDom, currentPatch[i])
    }
  }
}

function handlePatch(oldDom, currentPatch) {
  var _patch = currentPatch.patch

  switch (currentPatch.type) {
    case types.REPLACE:
      var newDom = _.isString(_patch) ? _patch : render(_patch)
      oldDom.parentNode.replaceChild(newDom, oldDom)
      break
    case types.REORDER:
      patchReorder(oldDom, _patch.moves)
      break
    case types.PROPS:
      patchProps(oldDom, _patch)
      break
    case types.TEXT:
      var newText = document.createTextNode(_patch)
      oldDom.parentNode.replaceChild(newText, oldDom)
      break
  }
}

function patchReorder(oldDom, moves) {
  var children = oldDom.childNodes
  var len = children.length
  var move, index, item, child
  for (var i = 0; i < moves.length; i++) {
    move = moves[i]
    index = move.index
    item = move.item
    child = children[index]

    switch (move.type) {
      case 0:
        // remove
        oldDom.removeChild(child)
        break
      case 1:
        // insert
        var newDom = render(item)
        oldDom.insertBefore(newDom, child)
        break
    }
  }
}

function patchProps(oldDom, _patch) {
  var props = Object.keys(_patch)
  for (var i = 0, prop; i < props.length; i++) {
    prop = props[i]
    oldDom.setAttribute(prop, _patch[prop])
  }
}

module.exports = patch
