const fs = require('fs')

async function run() {
    const file = fs.readFileSync('./input.txt', {
        encoding: 'utf-8'
    })
    const elves = file.split('\n\n')
    const elvesWithCalories = elves.reduce((collection, elf) => {
      const meals = elf.split('\n')
      const calories = meals.reduce((sum, meal) => {
        return sum + parseInt(meal)
      }, 0)
      return collection.concat([calories])
    }, [])
    elvesWithCalories.sort((a,b)=>b - a)
    return elvesWithCalories[0] + elvesWithCalories[1] + elvesWithCalories[2]
}

run().then(res => {
    console.log({
        result: {
          count: res
        }
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})