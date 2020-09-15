const { Compare, defaultCompare } = require('../../util')
const Node = require('../../models/bstree-node')
const BinarySearchTree = require('../binary-search-tree-v1/bstree')

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 0,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
}

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }

  getNodeHeight(node) {
    if(!node) {
      return -1
    }
    return Math.max(
      this.getNodeHeight(node.left), this.getNodeHeight(node.right)
    ) + 1
  }

  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch(heightDifference) {
    case -2:
      return BalanceFactor.UNBALANCED_RIGHT
    case -1:
      return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
    case 1:
      return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
    case 2:
      return BalanceFactor.UNBALANCED_LEFT
    default:
      return BalanceFactor.BALANCED
    }
  }

  // In RR Rotation every node moves one position to right
  // from the current position
  // Imbalanced left child of left subtree, perform a right rotation
  rotateRR(node) {
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }

  // In LL Rotation every node moves one position to left
  //from the current position
  // Imbalanced right child of right subtree, perform a left rotation
  rotateLL(node) {
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }

  // In LR Rotation, every node moves one position to left
  // then one position to right from the current position
  // Imbalanced left child of right subtree, perform a left-right rotation
  rotateLR(node) {
    node.left = this.rotateLL(node.left)
    return this.rotateRR(node)
  }

  // In RL Rotation, every node moves one position to right
  // then one position to left from the current position
  // Imbalanced right child of left subtree, perform a right-left rotation
  rotateRL(node) {
    node.right = this.rotateRR(node.right)
    return this.rotateLL(node)
  }

  insert(key) {
    this.root = this.insertNode(this.root, key)
  }

  insertNode(node, key) {
    if(!node) {
      return new Node(key)
    } else if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key)
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key)
    } else {
      return node // duplicated key
    }

    const balanceFactor = this.getBalanceFactor(node)
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if(this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotateRR(node)
      } else {
        return this.rotateLR(node)
      }
    }
    if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if(this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotateLL(node)
      } else {
        return this.rotateRL(node)
      }
    }
    return node
  }

  removeNode(node, key) {
    node = super.removeNode(node, key)
    if(!node) {
      return node
    }
    const balanceFactor = this.getBalanceFactor(node)
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left)
      if(balanceFactorLeft === BalanceFactor.BALANCED ||
         balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotateRR(node)
      }
      if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotateLR(node)
      }
    }

    if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right)
      if(balanceFactorRight === BalanceFactor.BALANCED ||
         balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotateLL(node)
      }
      if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotateRL(node)
      }
    }
    return node
  }
}

module.exports = AVLTree
