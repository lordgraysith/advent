const fs = require('fs')

async function run() {
    const file = fs.readFileSync('./input.txt', {
        encoding: 'utf-8'
    })
    const pairs = file.split('\n')
    return pairs.reduce((sum, pair)=>{
      const [elf1Temp, elf2Temp] = pair.split(',')
      const elf1 = parseElf(elf1Temp), elf2 = parseElf(elf2Temp)
      if(elf1.overlaps(elf2)) {
        return sum + 1
      }
      return sum
    }, 0)
}
function parseElf(elfString) {
  const [start, end] = elfString.split('-')
  return {
    start: parseInt(start),
    end: parseInt(end),
    contains: contains,
    overlaps
  }
}

function contains(other) {
  return this.start <= other.start && this.end >= other.end
}
function overlaps(other) {
  return !(this.start > other.end || this.end < other.start)
}
run().then(res => {
    console.log({
        result: res
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})