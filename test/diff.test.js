var diff = require('../src/diff')
var h = require('../src/h')
var assert = require('assert')
var types = require('../src/types')

describe('test diff', function() {
  it('should handle replacing', function() {
    var tree0 = h('i')
    var tree1 = h('em')

    var patches = diff(tree0, tree1)
    assert.deepEqual(patches, {
      0: [{
        type: types.REPLACE,
        patch: h('em')
      }]
    })
  })

  it('should handle props changes', function() {
    var tree0 = h('i', {
      class: 'foo',
      name: 'i',
      id: 'foo'
    })
    var tree1 = h('i', {
      class: 'bar',
      name: 'i'
    })

    var patches = diff(tree0, tree1)
    assert.deepEqual(patches, {
      0: [{
        type: types.PROPS,
        patch: {
          class: 'bar',
          id: undefined
        }
      }]
    })
  })

  it('should handle elements deleted', function() {
    var tree0 = h('i')
    var tree1 = null

    var patches = diff(tree0, tree1)
    assert.deepEqual(patches, {
      0: [{
        type: types.REMOVED
      }]
    })
  })

  it('should handle text node changed', function() {
    var tree0 = 'p1'
    var tree1 = 'p2'

    var patches = diff(tree0, tree1)
    assert.deepEqual(patches, {
      0: [{
        type: types.TEXT,
        patch: 'p2'
      }]
    })
  })
})
