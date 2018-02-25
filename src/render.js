function render(vnode) {
  // 1. tag
  var el = document.createElement(vnode.tagName)

  // 2. add props
  var props = vnode.props
  var propNames = Object.keys(props)
  var prop, value
  for (var i = 0; i < propNames.length; i++) {
    prop = propNames[i]
    value = props[prop]
    if (typeof value === 'function') {
      // bind this function to el
      el.addEventListener(prop, function(e) {
        value.call(this, e)
      })
    } else {
      el.setAttribute(prop, value)
    }
  }

  // 3. children
  var children = vnode.children
  var child
  for (var j = 0; j < children.length; j++) {
    child = children[j]
    // if child is text
    if (['string', 'number'].indexOf(typeof child) > -1) {
      var textNode = document.createTextNode(child)
      el.appendChild(textNode)
    } else {
      var childNode = render(child)
      el.appendChild(childNode)
    }
  }

  return el
}

module.exports = render
