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
      const [opponentLetter, outcomeLetter] = round.split(' ')
      const outcome = findOutcome(outcomeLetter)
      const opponent = findMove(opponentLetter)
      const move = findMoveForOutcome(opponent, outcome)
      return sum + outcomeScore(outcome) + moveScore(move)
    }, 0)
    return totalScore
}

function findMove(letter) {
  switch (letter) {
    case 'A':
      return ROCK
    case 'B':
      return PAPER
    case 'C':
      return SCISSORS
    default:
      throw Error(`unsupported input: ${letter}`)
  }
}

function findOutcome(letter) {
  switch (letter) {
    case 'X':
      return LOSS
    case 'Y':
      return DRAW
    case 'Z':
      return WIN
    default:
      throw Error(`unsupported input: ${letter}`)
  }
}

function findMoveForOutcome(opponent, outcome) {
  if (outcome === DRAW) return opponent
  if (opponent === ROCK && outcome === WIN ||
      opponent === SCISSORS && outcome === LOSS) {
    return PAPER
  }
  if (opponent === PAPER && outcome === LOSS ||
      opponent === SCISSORS && outcome === WIN) {
    return ROCK
  }
  return SCISSORS
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