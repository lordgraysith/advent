const fs = require('fs')

async function run() {
  const file = fs.readFileSync('./input.txt', {
      encoding: 'utf-8'
  })
  const lines = file.split('\n')
  const grid = lines.map(line => line.split('').map(Number))
  let topTreeScore = 0

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]
    for (let j = 0; j < row.length; j++) {
      topTreeScore = Math.max(topTreeScore, getTreeViewScore(grid, i, j))
    }
  }
  return topTreeScore
}

function getTreeViewScore(grid, row, col) {
  if(row === 0
    || col === 0
    || row === grid.length - 1
    || col === grid[0].length - 1) {
    return 0
  }

  return countTreesLeft(grid, row, col)
    * countTreesRight(grid, row, col)
    * countTreesUp(grid, row, col)
    * countTreesDown(grid, row, col)
}

function countTreesLeft(grid, row, col) {
  const height = grid[row][col]
  let treeCount = 0
  for (let i = col - 1; i >= 0; i--) {
    treeCount++
    if (grid[row][i] >= height) {
      break
    }
  }
  return treeCount
}

function countTreesRight(grid, row, col) {
  const height = grid[row][col]
  let treeCount = 0
  for (let i = col + 1; i < grid[0].length; i++) {
    treeCount++
    if (grid[row][i] >= height) {
      break
    }
  }
  return treeCount
}

function countTreesUp(grid, row, col) {
  const height = grid[row][col]
  let treeCount = 0
  for (let i = row - 1; i >= 0; i--) {
    treeCount++
    if (grid[i][col] >= height) {
      break
    }
  }
  return treeCount
}

function countTreesDown(grid, row, col) {
  const height = grid[row][col]
  let treeCount = 0
  for (let i = row + 1; i < grid.length; i++) {
    treeCount++
    if (grid[i][col] >= height) {
      break
    }
  }
  return treeCount
}

function isVisible(grid, row, col) {
  if(row === 0
    || col === 0
    || row === grid.length - 1
    || col === grid[0].length - 1) {
    return true
  }

  return isVisibleLeft(grid, row, col)
    || isVisibleRight(grid, row, col)
    || isVisibleUp(grid, row, col)
    || isVisibleDown(grid, row, col)
}

function isVisibleLeft(grid, row, col) {
  const height = grid[row][col]
  for (let i = col - 1; i >= 0; i--) {
    if (grid[row][i] >= height) {
      return false
    }
  }
  return true
}

function isVisibleRight(grid, row, col) {
  const height = grid[row][col]
  for (let i = col + 1; i < grid[row].length; i++) {
    if (grid[row][i] >= height) {
      return false
    }
  }
  return true
}

function isVisibleDown(grid, row, col) {
  const height = grid[row][col]
  for (let i = row + 1; i < grid.length; i++) {
    if (grid[i][col] >= height) {
      return false
    }
  }
  return true
}

function isVisibleUp(grid, row, col) {
  const height = grid[row][col]
  for (let i = row - 1; i >= 0; i--) {
    if (grid[i][col] >= height) {
      return false
    }
  }
  return true
}

run().then(res => {
    console.log({
        result: res
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})