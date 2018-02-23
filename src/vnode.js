function VNode(tagName, props, children) {
  props = props || {}

  this.tagName = tagName
  this.props = props
  this.key = props.key || undefined
  this.children = children || []
}

module.exports = VNode
