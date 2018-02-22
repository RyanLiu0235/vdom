var assert = require('assert')
var document = require('global/document')
var h = require('../src/h')

describe('test h', function() {
  it('should compile', function() {
    var tree = h('div', {
      class: 'bar'
    }, [
      h('p', {}, ['paragraph 1']),
      h('p', {}, ['paragraph 2'])
    ])

    assert.deepEqual(tree.tagName, 'div')
    assert.deepEqual(tree.props, { class: 'bar' })
    assert.deepEqual(tree.children[0].tagName, 'p')
    assert.deepEqual(tree.children[0].children[0], 'paragraph 1')
  })
})
