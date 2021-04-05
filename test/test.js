const fs = require('fs')
const path = require('path')
const os = require('os')

const tape = require('tape')

const linguasFile = require('./../src')

tape.test('parse: simple', t => {
  const simpleFixture = fs.readFileSync(path.join(__dirname, './simple.txt'))
  const result = linguasFile.parse(simpleFixture)
  t.deepEqual(result, ['en', 'fr', 'de', 'es'])
  t.end()
})

tape.test('parse: complex', t => {
  const complexFixture = fs.readFileSync(path.join(__dirname, './complex.txt'))
  const result = linguasFile.parse(complexFixture)
  t.deepEqual(result, ['en', 'fr', 'de', 'es'])
  t.end()
})

tape.test('serialize: simple', t => {
  const result = linguasFile.serialize(['en', 'fr', 'de', 'es'])
  t.equal(result, 'en fr de es' + os.EOL)
  t.end()
})

tape.test('serialize: with comment', t => {
  const result = linguasFile.serialize(
    ['en', 'fr', 'de', 'es'], 'what is this even'
  )
  t.equal(result, '# what is this even' + os.EOL + 'en fr de es' + os.EOL)
  t.end()
})

tape.test('parse and serialize', t => {
  const result = linguasFile.serialize(
    ['en', 'fr', 'de', 'es'], 'what is this even'
  )
  const tokens = linguasFile.parse(result)
  t.deepEqual(tokens, ['en', 'fr', 'de', 'es'])
  t.end()
})
