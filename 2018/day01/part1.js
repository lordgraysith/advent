const fs = require('fs')
const Bluebird = require('bluebird')
async function run() {
  const input = await Bluebird.fromCallback(cb =>
    fs.readFile('input1.txt', { encoding: 'utf8' }, cb)
  )
  const lines = input.split('\n')
  const result = lines
    .map(line => {
      return parseInt(line)
    })
    .reduce((init, curr) => {
      if (isNaN(curr)) {
        return init
      }
      return init + curr
    }, 0)
  console.log(result)
}

run()
  .catch(ex => {
    console.error(ex)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
