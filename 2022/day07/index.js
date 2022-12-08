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

  const folders = tree.tree.getFoldersAndSizes()

  return folders.filter(folder => {
    return folder.size > (30000000 - (70000000 - 46592386))
  }).sort((a, b) => {
    return b.size - a.size
  })
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
        getSumOfFolderSizesUnder,
        path: ['/'],
        getFoldersAndSizes
      },
      getFoldersAndSizes
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
        getSumOfFolderSizesUnder,
        path: this.currentLocation.concat([name]),
        getFoldersAndSizes
      }
    },
    getSumOfAllFolderSizesUnder
  }
}

function getFoldersAndSizes() {
  let result = []
  for (let key in this) {
    const folder = this[key]
    if (typeof folder === 'object' && !Array.isArray(folder)) { 
      result.push({
        path: folder.path.join('/'),
        size: folder.getFolderSize()
      })
      result = result.concat(folder.getFoldersAndSizes())
    }
  }
  return result
}

function getSumOfAllFolderSizesUnder(sizeLimit) {
  let sum = 0
  for (let key in this.tree) {
    const folder = this.tree[key]
    if (typeof folder === 'object' && !Array.isArray(folder)) {
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
    if (typeof folder === 'object' && !Array.isArray(folder)) {
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
    } else if (typeof this[key] === 'object' && !Array.isArray(this[key])) {
      size += this[key].getFolderSize()
    }
  })
  return size
}

run().then(res => {
    console.log(JSON.stringify({
        result: res
    }, null, 2))
}).catch(ex => {
    console.error(ex)
    process.exit(1)
})