const fs = require('fs')
const ROCK = 'ROCK', PAPER = 'PAPER', SCISSORS = 'SCISSORS'
const WIN = 'WIN', LOSS = 'LOSS', DRAW = 'DRAW'
async function run() {
    const file = fs.readFileSync('./input.txt', {
        encoding: 'utf-8'
    })
    
    const rounds = file.split('\n')
    const totalScore = rounds.reduce((sum, round) => {
      if (!round) return sum
      const [opponent, self] = round.split(' ')
      const outcome = findOutcome(opponent, self)
      const move = findMove(self)
      return sum + outcomeScore(outcome) + moveScore(move)
    }, 0)
    return totalScore
}

function findMove(letter) {
  switch (letter) {
    case 'A':
    case 'X':
      return ROCK
    case 'B':
    case 'Y':
      return PAPER
    case 'C':
    case 'Z':
      return SCISSORS
    default:
      throw Error(`unsupported input: ${letter}`)
  }
}

function findOutcome(opponent, self) {
  const oMove = findMove(opponent), sMove = findMove(self)
  if (oMove === sMove) return DRAW
  if (oMove === ROCK && sMove === PAPER ||
      oMove === PAPER && sMove === SCISSORS ||
      oMove === SCISSORS && sMove === ROCK) {
    return WIN
  }
  return LOSS
}

function outcomeScore(outcome) {
  switch (outcome) {
    case WIN:
      return 6
    case DRAW:
      return 3
    case LOSS:
      return 0
    default:
      throw Error(`unsupported outcome: ${outcome}`)
  }
}

function moveScore(move) {
  switch (move) {
    case ROCK:
      return 1
    case PAPER:
      return 2
    case SCISSORS:
      return 3
    default:
      throw Error(`unsupported move: ${move}`)
  }
}

// console.log(findMove('B'))

run().then(res => {
    console.log({
        result: {
          score: res
        }
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})