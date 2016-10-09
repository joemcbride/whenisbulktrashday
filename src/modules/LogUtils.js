/* eslint no-console: 0 */

export function log(...msgs) {
  console.log(...['[project]'].concat(msgs))
}

export function logError(...msgs) {
  console.log(...['[project]'].concat(msgs))
}
