const fs = require('fs')

async function run() {
    const file = fs.readFileSync('./input.txt', {
        encoding: 'utf-8'
    })
    const list = file.split('\n')
    const right = []
    for (let index = 0; index < list.length; index++) {
        const leftNum = parseInt(list[index]);
        const rightNum = 2020 - leftNum
        if (right.includes(leftNum)) {
            return {
                num1: leftNum,
                num2: rightNum,
                result() {
                    return this.num1 * this.num2
                }
            }
        }
        right.push(rightNum)
    }
    throw Error('number not found')
}

run().then(res => {
    console.log({
        num1: res.num1,
        num2: res.num2,
        result: res.result()
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})