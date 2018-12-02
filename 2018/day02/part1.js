const fs = require('fs')
const Bluebird = require('bluebird')
async function run() {
  const input = await Bluebird.fromCallback(cb =>
    fs.readFile('input.txt', { encoding: 'utf8' }, cb)
  )
  const lines = input.split('\n')
  const twos = lines.reduce((init, curr) => {
    return init + (hasRecurrence(curr, 2) ? 1 : 0)
  }, 0)

  const threes = lines.reduce((init, curr) => {
    return init + (hasRecurrence(curr, 3) ? 1 : 0)
  }, 0)

  console.log(twos * threes)
}

function hasRecurrence(code, recurNum) {
  const charMap = code.split('').reduce((init, curr) => {
    if (!init[curr]) {
      return { ...init, [curr]: 1 }
    }
    return { ...init, [curr]: init[curr] + 1 }
  }, {})
  return Object.values(charMap).reduce((init, curr) => {
    return init || curr === recurNum
  }, false)
}

run()
  .catch(ex => {
    console.error(ex)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
