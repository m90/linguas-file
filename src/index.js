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
  const result = tokens.reduce(function (acc, next) {
    if (acc[acc.length - 1].join(' ').length + next.length + 1 <= 78) {
      acc[acc.length - 1].push(next)
    } else {
      acc.push([next])
    }
    return acc
  }, [[]])
    .map(function (line) {
      return line.join(' ')
    })

  if (comment) {
    result.unshift('# ' + comment)
  }

  return result.join(os.EOL) + os.EOL
}
