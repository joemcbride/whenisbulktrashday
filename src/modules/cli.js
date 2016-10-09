/* eslint no-console: 0 */
import build from './build'

const action = process.argv[2]

const actions = {
  build
}

if (actions[action]) {
  console.log(`[${action}]`, 'task')
  actions[action](() => {
    console.log(`[${action}]`, 'task complete')
  })
} else {
  console.log(action, 'is not a valid command')
}
