var assert = require('assert')
var h = require('../src/h')

describe('test h', function() {
  it('should compile', function() {
    var tree = h('div', {
      class: 'bar'
    }, [
      h('p', {
        key: 'p1'
      }, ['paragraph 1']),
      h('p', {
        key: 'p2'
      }, ['paragraph 2'])
    ])

    assert.deepEqual(tree.tagName, 'div')
    assert.deepEqual(tree.props, { class: 'bar' })
    assert.deepEqual(tree.children[0].tagName, 'p')
    assert.deepEqual(tree.children[0].key, 'p1')
    assert.deepEqual(tree.children[0].children[0], 'paragraph 1')
  })
})
