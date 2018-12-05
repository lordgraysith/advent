const fs = require('fs')
const Bluebird = require('bluebird')
async function run() {
  const input = await Bluebird.fromCallback(cb =>
    fs.readFile('input.txt', { encoding: 'utf8' }, cb)
  )
  const lines = input.split('\n')
  for (let i = 0; i < lines.length; i++) {
    let foundCode = false
    const code1 = lines[i]
    for (let j = i + 1; j < lines.length; j++) {
      const code2 = lines[j]
      if (isCodePair(code1, code2)) {
        foundCode = true
        console.log(code1, code2)
        console.log(removeUncommonChar(code1, code2))
        break
      }
    }
    if (foundCode) break
  }
}

function isCodePair(code1, code2) {
  let numberOfUnmatchedChars = 0
  for (let i = 0; i < code1.length; i++) {
    if (code1[i] !== code2[i]) numberOfUnmatchedChars++
    if (numberOfUnmatchedChars > 1) break
  }
  return numberOfUnmatchedChars === 1
}

function removeUncommonChar(code1, code2) {
  const newCode = []
  for (let i = 0; i < code1.length; i++) {
    if (code1[i] === code2[i]) newCode.push(code1[i])
  }
  return newCode.join('')
}

run()
  .catch(ex => {
    console.error(ex)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
