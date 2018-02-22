function VNode(tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

module.exports = VNode
