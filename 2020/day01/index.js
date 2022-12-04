const fs = require('fs')

async function run() {
    const file = fs.readFileSync('./input.txt', {
        encoding: 'utf-8'
    })
    const list = file.split('\n')
    const right = {}, middle = []
    for (let index = 0; index < list.length; index++) {
        const leftNum = parseInt(list[index]);
        for (let i2 = 0; i2 < middle.length; i2++) {
            const middleNum = middle[i2];
            const rightNum = 2020 - (leftNum + middleNum)
            if (Object.keys(right).includes(rightNum)) {
                return {
                    num1: leftNum,
                    num2: rightNum,
                    num3: middleNum,
                    result() {
                        return this.num1 * this.num2 * this.num3
                    }
                }
            }
            right[rightNum] = {}
        }
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