const fs = require('fs')

async function run() {
    const file = fs.readFileSync('./input.txt', {
        encoding: 'utf-8'
    })
    for(let s = 0, e = 4; e < file.length; s++, e++) {
      const sub = file.substring(s, e)
      const map = {
        [sub[0]]:1,
        [sub[1]]:1,
        [sub[2]]:1,
        [sub[3]]:1,
      }
      if (Object.keys(map).length >= 4) {
        return e
      }
    }
    return 'result'
}

run().then(res => {
    console.log({
        result: res
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})