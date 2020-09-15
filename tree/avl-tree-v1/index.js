const AVLTree = require('./avltree')

const printNode = value => {
  console.log(value)
}

// let strTree = ''
// const printTree = (value) => {
//   if(value) {
//     strTree += `${value} `
//   }
// }

const treeInString = () => {
  let tree = ''

  const addValue = (value) => {
    if(value) {
      tree += `${value} `
    }
  }

  return {
    addKey: (value) => {
      addValue(value)
    },
    getTree: () => {
      return tree
    },
    clean: () => {
      tree = ''
    }
  }
}

const tree = new AVLTree()

//             11
//          /      \
//        /          \
//      7             15
//    /   \          /   \
//   5     9       13     20
//  / \   /  \    /  \   /  \
// 3   6  8  10  12  14 18  25

tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

console.log(tree.root)
// tree.inOrderTraverse(printNode)

console.log(tree.min().key)
console.log(tree.max().key)

console.log(tree.search(25))

// tree.remove(6)
// console.log(tree.search(6))
// tree.insert(6)

tree.remove(12)
tree.remove(14)
tree.remove(13)

// tree.remove(20)
// tree.remove(18)
// tree.remove(25)

// tree.remove(12)
// tree.remove(14)
// tree.remove(13)


// tree.remove(8)
// tree.remove(6)
// tree.remove(3)
// tree.inOrderTraverse(printTree)
// tree.preOrderTraverse(printTree)
// tree.posOrderTraverse(printTree)
// tree.levelOrderTraverse(printTree)
// console.log(strTree)


const strTree = treeInString()

tree.inOrderTraverse(strTree.addKey)
console.log(strTree.getTree())

strTree.clean()
tree.preOrderTraverse(strTree.addKey)
console.log(strTree.getTree())

strTree.clean()
tree.posOrderTraverse(strTree.addKey)
console.log(strTree.getTree())

strTree.clean()
tree.levelOrderTraverse(strTree.addKey)
console.log(strTree.getTree())
