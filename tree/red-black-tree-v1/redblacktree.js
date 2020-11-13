const { Compare, defaultCompare } = require('../../util')
const { RedBlackNode, Colors } = require('../../models/redblack-node')
const BinarySearchTree = require('../binary-search-tree-v1/bstree')
const Queue = require('../../queue/queue-v1/queue')

class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }

  insert(key) {
    if(!this.root) {
      this.root = new RedBlackNode(key)
      this.root.color = Colors.BLACK
    } else {
      const newNode = this.insertNode(this.root, key)
      this.fixTreePropertiesAfterInserting(newNode)
      return newNode
    }
  }

  insertNode(node, key) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(!node.left) {
        node.left = new RedBlackNode(key)
        node.left.parent = node
        return node.left
      } else {
        return this.insertNode(node.left, key)
      }
    }
    if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      if(!node.right) {
        node.right = new RedBlackNode(key)
        node.right.parent = node
        return node.right
      } else {
        return this.insertNode(node.right, key)
      }
    }
  }

  flipColors(parent, uncle, grandParent) {
    parent.color = Colors.BLACK
    grandParent.color = Colors.RED
    if(uncle && uncle.isRed()) {
      uncle.color = Colors.BLACK
    }
  }

  replaceNode(oldNode, newNode) {
    newNode.parent = oldNode.parent
    if(!oldNode.parent) {
      this.root = newNode
    } else {
      if(oldNode === oldNode.parent.left) {
        oldNode.parent.left = newNode
      } else {
        oldNode.parent.right = newNode
      }
    }
  }

  rotateLL(node) {
    const tmp = node.right
    node.right = tmp.left

    if(tmp.left && tmp.left.key) {
      tmp.left.parent = node
    }
    this.replaceNode(node, tmp)

    tmp.left = node
    node.parent = tmp
  }

  rotateRR(node) {
    const tmp = node.left
    node.left = tmp.right

    if(tmp.right && tmp.right.key) {
      tmp.right.parent = node
    }
    this.replaceNode(node, tmp)

    tmp.right = node
    node.parent = tmp
  }

  fixTreePropertiesAfterInserting(node) {
    while(node && node.parent &&
          node.parent.isRed() &&
          node.isRed()) {
      let parent = node.parent
      const grandParent = parent.parent

      if(grandParent && grandParent.left === parent) {
        const uncle = grandParent.right
        if(uncle && uncle.isRed()) {
          this.flipColors(parent, uncle, grandParent)
          node = grandParent
        } else {
          if(node === parent.right) {
            this.rotateLL(parent)
            node = parent
            parent = node.parent
          }
          this.rotateRR(grandParent)
          this.flipColors(parent, uncle, grandParent)
          node = parent
        }
      } else {
        const uncle = grandParent.left
        if(uncle && uncle.isRed()) {
          this.flipColors(parent, uncle, grandParent)
          node = grandParent
        } else {
          if(node === parent.left) {
            this.rotateRR(parent)
            node = parent
            parent = node.parent
          }
          this.rotateLL(grandParent)
          this.flipColors(parent, uncle, grandParent)
          node = parent
        }
      }
    }
    this.root.color = Colors.BLACK
  }

  get(key) {
    return this.getNode(this.root, key)
  }

  getNode(node, key) {
    if(!node) {
      return null
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node = this.getNode(node.left, key)
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node = this.getNode(node.right, key)
    }
    return node
  }

  getSibling(node) {
    if(!node.parent) {
      return null
    }
    if(node.parent.left === node) {
      return node.parent.right
    } else {
      return node.parent.left
    }
  }

  getSucessor(node) {
    if(node.left && node.right) {
      return this.minNode(node.right)
    } else if(node.left && !node.right) {
      return node.left
    } else if(node.right && !node.left) {
      return node.right
    } else {
      return null
    }
  }

  remove(key) {
    if (!this.root) {
      return null
    }
    const node = this.get(key)
    const removedNode = this.removeNode(node)
    return removedNode ? removedNode.key : undefined
  }

  removeNode(node) {
    if(!node) {
      return null
    }

    let sucessor = this.getSucessor(node)
    const sibling = this.getSibling(node)

    const isDoubleBlack = (
      (!node || !node.isRed()) && (!sucessor || !sucessor.isRed())
    )

    if(!sucessor) {
      if(node === this.root) {
        this.root = null
      } else {
        if(isDoubleBlack) {
          this.fixTreePropertiesAfterDeleting(node)
        } else {
          if(sibling) {
            sibling.color = Colors.RED
          }
        }
        if(node.parent.left === node) {
          node.parent.left = null
        } else {
          node.parent.right = null
        }
      }
      return node
    }

    if(!node.left || !node.right) {
      if(node === this.root) {
        node.key = sucessor.key
        node.left = null
        node.right = null
      } else {
        if(node.parent.left === node) {
          node.parent.left = sucessor
        } else {
          node.parent.right = sucessor
        }
        sucessor.parent = node.parent
        if(isDoubleBlack) {
          this.fixTreePropertiesAfterDeleting(sucessor)
        } else {
          sucessor.color = Colors.BLACK
        }
      }
      return node
    }
    const tmp = sucessor.key
    sucessor.key = node.key
    node.key = tmp
    return this.removeNode(sucessor)
  }

  fixTreePropertiesAfterDeleting(node) {
    let sibling = null
    while(node !== this.root && !node.isRed()) {
      if(node === node.parent.left) {
        sibling = node.parent.right
        if(sibling.isRed()) {
          sibling.color = Colors.BLACK
          node.parent.color = Colors.RED
          this.rotateLL(node.parent)
          sibling = node.parent.right
        }
        if((!sibling.left || !sibling.left.isRed()) &&
           (!sibling.right || !sibling.right.isRed())) {
          sibling.color = Colors.RED
          node = node.parent
        } else {
          if(sibling.left && !sibling.isRed()) {
            sibling.left.color = Colors.BLACK
            sibling.color = Colors.RED
            this.rotateRR(sibling)
            sibling = node.parent.right
          }
          sibling.color = node.parent.color
          node.parent.color = Colors.BLACK
          sibling.right.color = Colors.BLACK
          this.rotateLL(node.parent)
          node = this.root
        }
      } else {
        sibling = node.parent.left
        if(sibling.isRed()) {
          sibling.color = Colors.BLACK
          node.parent.color = Colors.RED
          this.rotateRR(node.parent)
          sibling = node.parent.left
        }
        if((!sibling.left || !sibling.left.isRed()) &&
           (!sibling.right || !sibling.right.isRed())) {
          sibling.color = Colors.RED
          node = node.parent
        } else {
          if(sibling.right && !sibling.isRed()) {
            sibling.right.color = Colors.BLACK
            sibling.color = Colors.RED
            this.rotateLL(sibling)
            sibling = node.parent.left
          }
          sibling.color = node.parent.color
          node.parent.color = Colors.BLACK
          sibling.left.color = Colors.BLACK
          this.rotateRR(node.parent)
          node = this.root
        }
      }
    }
    node.color = Colors.BLACK
  }

  levelOrderTraverse(callback) {
    const queue = new Queue()
    let current = this.root
    queue.enqueue(current)
    while(queue.items && current) {
      current = queue.dequeue()
      if(current) {
        if(current.left) {
          queue.enqueue(current.left)
        }
        if(current.right) {
          queue.enqueue(current.right)
        }
        callback(`${current.key}#${current.color}`)
      }
    }
  }
}

module.exports = RedBlackTree
