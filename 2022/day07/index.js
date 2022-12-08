const fs = require('fs')

async function run() {
  const file = fs.readFileSync('./input.txt', {
      encoding: 'utf-8'
  })
  const lines = file.split('\n')
  const tree = buildTree()
  lines.forEach(line => {
    tree.readLine(line)
  })

  return tree.getSumOfAllFolderSizesUnder(100000)
}

function buildTree() {
  return {
    cd: function(dir) {
      if (dir === '..'){
        this.currentLocation.pop()
      } else if (dir === '/') {
        this.currentLocation = ['/']
      } else {
        this.currentLocation.push(dir)
      }
    },
    readLine: function (line) {
      let cmd
      if (cmd = /\$\scd\s(.+)/.exec(line)) {
        this.cd(cmd[1])
      } else if (cmd = /dir\s(.+)/.exec(line)) {
        this.addFolder(cmd[1])
      } else if (cmd = /(\d+)\s(.+)/.exec(line)) {
        this.addFile(cmd[2], parseInt(cmd[1]))
      }
    },
    tree: {
      '/': {
        getFolderSize,
        getSumOfFolderSizesUnder
      }
    },
    currentLocation: ['/'],
    addFile: function(name, size) {
      let folder = this.tree
      this.currentLocation.forEach((f) => {
        folder = folder[f]
      })
      folder[name] = size
    },
    addFolder: function(name) {
      let folder = this.tree
      this.currentLocation.forEach((f) => {
        folder = folder[f]
      })
      folder[name] = {
        getFolderSize,
        getSumOfFolderSizesUnder
      }
    },
    getSumOfAllFolderSizesUnder
  }
}

function getSumOfAllFolderSizesUnder(sizeLimit) {
  let sum = 0
  for (let key in this.tree) {
    const folder = this.tree[key]
    if (typeof folder === 'object') {
      const size = folder.getFolderSize()
      if (size <= sizeLimit) {
        sum += size
      }
      sum += folder.getSumOfFolderSizesUnder(sizeLimit)
    }
  }
  return sum
}

function getSumOfFolderSizesUnder(sizeLimit) {
  let sum = 0
  for (let key in this) {
    const folder = this[key]
    if (typeof folder === 'object') {
      const size = folder.getFolderSize()
      if (size <= sizeLimit) {
        sum += size
      }
      sum += folder.getSumOfFolderSizesUnder(sizeLimit)
    }
  }
  return sum
}

function getFolderSize(){
  const keys = Object.keys(this)
  let size = 0
  keys.forEach(key => {
    if (typeof this[key] === 'number') {
      size += this[key]
    } else if (typeof this[key] === 'object') {
      size += this[key].getFolderSize()
    }
  })
  return size
}

run().then(res => {
    console.log({
        result: res
    })
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})