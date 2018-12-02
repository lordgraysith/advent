const fs = require('fs')
const Bluebird = require('bluebird')
async function run() {
  const input = await Bluebird.fromCallback(cb =>
    fs.readFile('input1.txt', { encoding: 'utf8' }, cb)
  )
  const lines = input.split('\n')
  const parsed = lines.map(line => {
    return parseInt(line)
  })
  const encountered = {}
  let frequency = 0
  for (
    let done = false, offset = 0;
    !done;
    offset = offset < parsed.length - 1 ? offset + 1 : 0
  ) {
    if (isNaN(parsed[offset])) continue
    frequency += parsed[offset]
    if (!encountered[frequency]) {
      encountered[frequency] = true
    } else {
      done = true
    }
  }
  console.log(frequency)
}

run()
  .catch(ex => {
    console.error(ex)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
