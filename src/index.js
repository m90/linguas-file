/**
 * Copyright 2021 - Frederik Ring <frederik.ring@posteo.de>
 * SPDX-License-Identifier: MPL-2.0
 */

const os = require('os')

exports.parse = parse
function parse (input) {
  return input.toString('utf-8')
    .split(/\r?\n/)
    .map(function (line) { return line.trim() })
    .filter(function (line) { return line.indexOf('#') !== 0 && line !== '' })
    .map(function (line) { return line.split(/\s+/) })
    .reduce(function (acc, line) {
      acc = acc.concat(line)
      return acc
    }, [])
    .map(function (token) { return token.trim() })
}

exports.serialize = serialize
function serialize (tokens, comment) {
  const out = []
  if (comment) {
    out.push('# ' + comment)
  }
  out.push(tokens.join(' '))
  return out.join(os.EOL) + os.EOL
}
