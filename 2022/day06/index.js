const fs = require('fs')

async function run() {
    const file = fs.readFileSync('./input.txt', {
        encoding: 'utf-8'
    })
    for(let s = 0, e = 14; e < file.length; s++, e++) {
      const sub = file.substring(s, e)
      const map = {
        [sub[0]]:1,
        [sub[1]]:1,
        [sub[2]]:1,
        [sub[3]]:1,
        [sub[4]]:1,
        [sub[5]]:1,
        [sub[6]]:1,
        [sub[7]]:1,
        [sub[8]]:1,
        [sub[9]]:1,
        [sub[10]]:1,
        [sub[11]]:1,
        [sub[12]]:1,
        [sub[13]]:1,
      }
      if (Object.keys(map).length >= 14) {
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