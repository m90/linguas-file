const fs = require('fs')
const path = require('path')

const tape = require('tape')

const linguasFile = require('./../src')

tape.test('parse: simple', t => {
  const simpleFixture = fs.readFileSync(path.join(__dirname, './simple.txt'))
  const result = linguasFile.parse(simpleFixture)
  t.deepEqual(result, ['pt', 'fr', 'de', 'es'])
  t.end()
})

tape.test('parse: complex', t => {
  const complexFixture = fs.readFileSync(path.join(__dirname, './complex.txt'))
  const result = linguasFile.parse(complexFixture)
  t.deepEqual(result, ['pt', 'fr', 'de', 'es'])
  t.end()
})

tape.test('serialize: simple', t => {
  const result = linguasFile.serialize(['pt', 'fr', 'de', 'es'])
  t.equal(result, 'pt fr de es\n')
  t.end()
})

tape.test('serialize: with comment', t => {
  const result = linguasFile.serialize(
    ['pt', 'fr', 'de', 'es'], 'what is this even'
  )
  t.equal(result, '# what is this even\npt fr de es\n')
  t.end()
})

tape.test('parse and serialize', t => {
  const result = linguasFile.serialize(
    ['pt', 'fr', 'de', 'es'], 'what is this even'
  )
  const tokens = linguasFile.parse(result)
  t.deepEqual(tokens, ['pt', 'fr', 'de', 'es'])
  t.end()
})
