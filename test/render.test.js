var assert = require('assert')
var h = require('../src/h')
var render = require('../src/render')
var sinon = require('sinon')
var spy = sinon.spy
var stub = sinon.stub

describe('test render', function() {
  it('should render', function() {
    var tree = h('div', {
      class: 'bar',
      onclick: function(e) {
        console.log(e.target.tagName)
      }
    }, [
      h('p', {}, ['paragraph 1']),
      h('p', {}, ['paragraph 2'])
    ])
    // for test, pretend we have `document`
    var docCopy = global.document
    global.document = {}

    var spy1 = document.createTextNode = spy()
    var spy2 = spy()
    var spy3 = spy()
    var spy0 = document.createElement = stub().returns({
      setAttribute: spy2,
      appendChild: spy3
    })

    render(tree)
    assert.deepEqual(spy0.callCount, 3)
    assert.ok(spy1.withArgs('paragraph 1').calledOnce)
    assert.ok(spy2.withArgs('class', 'bar').calledOnce)
    assert.deepEqual(spy3.callCount, 4)

    global.document = docCopy
  })
})
