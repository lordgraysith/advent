const fs = require('fs')

async function run() {
    const file = fs.readFileSync('./input.txt', {
        encoding: 'utf-8'
    })
    const lines = file.split('\n')
    const stackLines = lines.slice(0,9)
    const stacks = createStacks(stackLines)
    const moveLines = lines.slice(10)
    moveLines.forEach((move) => {
      stacks.move(parseMove(move))
    })
    return stacks.top().join('')
}

function parseMove(move) {
  //move 3 from 5 to 2
  const reg = /move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)$/
  const [ , crateCount, source, dest] = reg.exec(move)
  return {
    crateCount,
    source,
    dest,
    text: move
  }
}

function createStacks(stackLines) {
  let stacks = [null]
  for(let stackNum = 1; stackNum <= 9; stackNum++) {
    const boxAt = stackNum === 1 ? 1 : (stackNum - 1) * 4 + 1
    stacks.push(createStack(boxAt, stackLines))
  }
  return {
    stacks,
    move: function (move) {
      const source = this.stacks[move.source],
        dest = this.stacks[move.dest]
      console.log(`
      Before move
      Source: ${source}
      Destination: ${dest}
      Move: ${move.text}`)
      const toMove = source.splice(source.length - move.crateCount)
      while(toMove.length > 0) {
        dest.push(toMove.shift())
      }
      console.log(`
      After move
      Source: ${source}
      Destination: ${dest}
      Move: ${move.text}`)
    },
    top: function() {
      const topArray = []
      for(i = 1; i <= 9; i++) {
        const stack = this.stacks[i]
        topArray.push(
          stack[stack.length - 1]
        )
      }
      return topArray
    }
  }
}

function createStack(boxAt, stackLines) {
  const stack = []
  for(let lineNum = 0; lineNum < stackLines.length-1; lineNum++) {
    const line = stackLines[lineNum]
    const box = line.substring(boxAt, boxAt+1)
    if(/\w/.test(box)) stack.unshift(box)
  }
  return stack
}

run().then(res => {
    console.log({
        result: res
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})