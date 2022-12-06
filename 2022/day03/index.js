const fs = require('fs')

async function run() {
  const file = fs.readFileSync('./input.txt', {
      encoding: 'utf-8'
  })
  const rucksacks=file.split('\n')
  const groups = rucksacks.reduce((previous, rucksack, currentIndex) => {
    const lastGroup = previous[previous.length-1]
    if(lastGroup.length < 3) {
      lastGroup.push(rucksack)
    } else {
      previous.push([rucksack])
    }
    return previous
  }, [[]])
  const total = groups.reduce((sum, group) => {
    let repeatedLetter
    for (const letter of group[0]) {
      if(group[1].indexOf(letter) >=0
      && group[2].indexOf(letter) >=0) {
        repeatedLetter = letter
        break
      }
    }
    return sum + convertLetterToNumber(repeatedLetter)
  }, 0)
  return total
}
function calculateRucksack(sum, rucksack) {
  const [firstComp, secondComp] = divideString(rucksack)
  let repeatedLetter
  for (let letter of firstComp) {
    if(secondComp.indexOf(letter) >=0 ){
      repeatedLetter = letter
      break
    }
  }
  return sum + convertLetterToNumber(repeatedLetter)
}
function divideString(input) {
  const half = input.length/2
  return [input.substring(0,half), input.substring(half)]

}

function convertLetterToNumber(letter) {
  if(/[A-Z]/.test(letter)) {
    return letter.charCodeAt(0) - 38
  }
  return letter.charCodeAt(0) - 96
}

run().then(res => {
    console.log({
        result: res
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})
//console.log(divideString('abcdefg'))

// const sixOnes = [1, 1, 1, 1, 1, 1]

// console.log(sixOnes.reduce(concatenate), '')

// function sum(previousValue, currentValue) {
//   return previousValue + currentValue
// }

// function multiply(previousValue, currentValue) {
//   return previousValue * currentValue
// }

// function concatenate(previousValue, currentValue) {
//   return '' + previousValue + currentValue
// }