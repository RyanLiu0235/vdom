var diff = require('../src/diff')
var h = require('../src/h')
var render = require('../src/render')
var patch = require('../src/patch')
var assert = require('assert')
var jsdom = require('mocha-jsdom')
var sinon = require('sinon')

describe('test patch', function() {
  // mock browser
  jsdom()

  it('should handle dom removed', function() {
    var tree0 = h('ul', {}, [
      h('li', { key: 0 }),
      h('li', { key: 1 }),
      h('li', { key: 2 })
    ])
    var tree1 = h('ul', {}, [
      h('li', { key: 1 })
    ])

    var dom = render(tree0)
    var patches = diff(tree0, tree1)
    sinon.spy(dom, 'removeChild')
    patch(dom, patches)

    assert.ok(dom.removeChild.calledTwice)
    dom.removeChild.restore()
  })

  it('should handle children reordered', function() {
    var tree0 = h('ul', {}, [
      h('li', { key: 0 }),
      h('li', { key: 1 })
    ])
    var tree1 = h('ul', {}, [
      h('li', { key: 1 }),
      h('li', { key: 2 }),
      h('li', { key: 0 })
    ])

    var dom = render(tree0)
    var patches = diff(tree0, tree1)
    sinon.spy(dom, 'removeChild')
    sinon.spy(dom, 'insertBefore')
    patch(dom, patches)

    assert.ok(dom.removeChild.calledOnce)
    assert.ok(dom.insertBefore.calledTwice)
    dom.removeChild.restore()
    dom.insertBefore.restore()
  })

  it('should handle props changed', function() {
    var tree0 = h('i', {
      class: 'foo',
      name: 'i',
      id: 'foo'
    })
    var tree1 = h('i', {
      class: 'bar',
      name: 'i',
      baz: 1
    })

    var dom = render(tree0)
    var patches = diff(tree0, tree1)
    sinon.spy(dom, 'setAttribute')
    sinon.spy(dom, 'removeAttribute')
    patch(dom, patches)

    assert.ok(dom.setAttribute.withArgs('class', 'bar').calledOnce)
    assert.ok(dom.setAttribute.withArgs('baz', 1).calledOnce)
    assert.ok(dom.removeAttribute.withArgs('id').calledOnce)
    dom.setAttribute.restore()
  })

  it('should handle text node changed', function() {
    var tree0 = h('p', { class: 'a' }, ['paragraph a'])
    var tree1 = h('p', { class: 'a' }, ['paragraph b'])

    // this one is for branches coverage
    var tree2 = h('p', { class: 'a' }, ['paragraph a'])

    var dom = render(tree0)
    var patches01 = diff(tree0, tree1)
    var patches02 = diff(tree0, tree2)
    sinon.spy(dom, 'replaceChild')
    patch(dom, patches01)
    patch(dom, patches02)

    assert.ok(dom.replaceChild.calledOnce)
    dom.replaceChild.restore()
  })

  it('should handle DOM replaced', function() {
    var tree0 = h('div', {}, [h('em')])
    var tree1 = h('div', {}, [h('i')])

    var dom = render(tree0)
    var patches = diff(tree0, tree1)
    sinon.spy(dom, 'replaceChild')
    patch(dom, patches)

    assert.ok(dom.replaceChild.calledOnce)
    dom.replaceChild.restore()
  })
})
