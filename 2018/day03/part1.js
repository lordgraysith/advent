const fs = require('fs')
const Bluebird = require('bluebird')
async function run() {
  const input = await Bluebird.fromCallback(cb =>
    fs.readFile('input-tst.txt', { encoding: 'utf8' }, cb)
  )
  const fabric = new Array(8).fill(new Array(8).fill(0))
  console.log(fabric)

  const lines = input.split('\n')
  lines.forEach(line => {
    const claim = parseClaim(line)
    console.log(claim)
    claim.forEach(sq => {
      fabric[sq[0]][sq[1]]++
    })
  })

  // const claim0 = parseClaim(line[0])
  // claim0.forEach(sq => {
  //   fabric[sq[0]][sq[1]]++
  // })

  console.log(fabric)

  const conflictCount = fabric.reduce((colSum, col) => {
    return (
      colSum +
      col.reduce((rowSum, sq) => {
        return rowSum + (sq > 1 ? 1 : 0)
      }, 0)
    )
  }, 0)
  console.log(conflictCount)
}

function parseClaim(line) {
  const position = line
    .split('@')[1]
    .split(':')[0]
    .trim()
    .split(',')
  const area = line
    .split('@')[1]
    .split(':')[1]
    .trim()
    .split('x')
  const squares = []
  for (
    let col = parseInt(position[0]);
    col < parseInt(position[0]) + parseInt(area[0]);
    col++
  ) {
    for (
      let row = parseInt(position[1]);
      row < parseInt(position[1]) + parseInt(area[1]);
      row++
    ) {
      squares.push([col, row])
    }
  }
  return squares
}

run()
  .catch(ex => {
    console.error(ex)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
