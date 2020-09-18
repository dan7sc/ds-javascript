const RedBlackTree = require('./redblacktree')

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

const tree = new RedBlackTree()

//             11
//          /      \
//        /          \
//      7             15
//    /   \          /   \
//   5     9       13     20
//  / \   /  \    /  \   /  \
// 3   6  8  10  12  14 18  25

//               8
//            /      \
//          /          \
//        5             13
//      /   \          /   \
//     3     7       11#    15#
//          /       /  \   /   \
//         6#      9   12 14   20
//                  \         /  \
//                  10#     18#  25#
// red node: #

const numbers = [
  11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6
]
numbers.forEach(number => {
  tree.insert(number)
})

// console.log(tree.root)
// tree.inOrderTraverse(printNode)

console.log(tree.min().key)
console.log(tree.max().key)

console.log(tree.search(25))
console.log(tree.search(125))

tree.remove(6)
tree.remove(7)
tree.remove(8)
tree.remove(13)
tree.remove(15)
tree.remove(14)

tree.insert(6)

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
