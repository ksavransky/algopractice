class Queue {
  constructor(data = null){
    this.data = data || []
  }
  takeItem(){
    return !this.isEmpty() ? this.data.shift() : 'No items in queue'
  }
  addItem(item){
    return this.data.push(item)
  }
  front(){
    return this.data[0]
  }
  isEmpty(){
    return this.data.length === 0
  }
}

class Node {
  constructor(data) {
    this.data = data
    this.leftNode = null
    this.rightNode = null
  }
}

class BinarySearchTree {
    constructor() {
      this.root = null
      this.currentOrder = []
      this.depth = 0
      this.depthBalance = 0
    }

    findMinNode(node){
      if (node.leftNode) {
        return this.findMinNode(node.leftNode)
      } else {
        return node
      }
    }

    getRootNode() {
      return this.root
    }

    size(node) {
      if (!node) {
        return 0
      }
      return 1 + this.size(node.leftNode ? node.leftNode : null) + this.size(node.rightNode ? node.rightNode : null)
    }

    maxDepthHelper(node, depth){
      if (depth > this.depth) {
        this.depth = depth
      }
      if (node.leftNode) {
        this.maxDepthHelper(node.leftNode, depth + 1)
      }
      if (node.rightNode) {
        this.maxDepthHelper(node.rightNode, depth + 1)
      }
    }

    maxDepth(node){
      if (!node){
        return 0
      }
      this.depth = 0
      this.maxDepthHelper(node, 1)
      return this.depth
    }

    insertHelper(data, parentNode) {
      if (parentNode.data < data){
        if (!parentNode.rightNode) {
          parentNode.rightNode = new Node(data)
        } else {
          this.insertHelper(data, parentNode.rightNode)
        }
      } else {
        if (!parentNode.leftNode) {
          parentNode.leftNode = new Node(data)
        } else {
          this.insertHelper(data, parentNode.leftNode)
        }
      }
    }

    insert(data) {
      if (!this.root) {
        this.root = new Node(data)
      } else {
        this.insertHelper(data, this.root)
      }
    }

    getParentNode(childNode, possibleParent = null) {
      if (!possibleParent) {
        possibleParent = this.root
      }
      if (childNode.data < possibleParent.data) {
        if (!possibleParent.leftNode) {
          return null
        } else if (possibleParent.leftNode.data === childNode.data) {
          return possibleParent
        } else {
          return this.getParentNode(childNode, possibleParent.leftNode)
        }
      } else {
        if (!possibleParent.rightNode) {
          return null
        } else if (possibleParent.rightNode.data === childNode.data) {
          return possibleParent
        } else {
          return this.getParentNode(childNode, possibleParent.rightNode)
        }
      }
    }


    removeHelper(nodeToRemove){
      if (!nodeToRemove.leftNode && !nodeToRemove.rightNode) {
        nodeToRemove = null

      } else if (nodeToRemove.leftNode && !nodeToRemove.rightNode) {
        const parentNode = this.getParentNode(nodeToRemove)
        // NOTE below: you can't simply do nodeToRemove = nodeToRemove.leftNode
        // you have to replace the nodeToRemove's parentNode's reference to the node being removed!
        if (parentNode.data > nodeToRemove.data) {
          parentNode.leftNode = nodeToRemove.leftNode
        } else {
          parentNode.rightNode = nodeToRemove.leftNode
        }
      } else if (!nodeToRemove.leftNode && nodeToRemove.rightNode) {
        const parentNode = this.getParentNode(nodeToRemove)
        // NOTE below: you can't simply do nodeToRemove = nodeToRemove.rightNode
        // you have to replace the nodeToRemove's parentNode's reference to the node being removed!
        if (parentNode.data > nodeToRemove.data) {
          parentNode.leftNode = nodeToRemove.rightNode
        } else {
          parentNode.rightNode = nodeToRemove.rightNode
        }
      } else {
        // has both left and right node
        // NOTE this trick with findMinNode...
        const rightNodesMinNode = this.findMinNode(nodeToRemove.rightNode)
        this.removeHelper(nodeToRemove.rightNode)
        nodeToRemove.data = rightNodesMinNode.data
      }
    }

    remove(node, removeValue) {
      const nodeToRemove = this.search(node, removeValue)
      this.removeHelper(nodeToRemove)
      return this.root
    }

    konRemove(data) {
      const nodeToRemove = this.search(this.root, data)
      if (!nodeToRemove) {
        return 'no such node exists'
      }
      if (nodeToRemove.leftNode) {
        if (nodeToRemove.leftNode.leftNode) {
          this.preorder(nodeToRemove.leftNode.leftNode)
        }
        if (nodeToRemove.leftNode.rightNode) {
          this.preorder(nodeToRemove.leftNode.rightNode)
        }
        nodeToRemove.data = nodeToRemove.leftNode.data
        nodeToRemove.leftNode = null
        this.currentOrder.forEach((reinsertData) => {
          this.insert(reinsertData)
        })
      } else if (nodeToRemove.rightNode) {
        if (nodeToRemove.rightNode.leftNode) {
          this.preorder(nodeToRemove.rightNode.leftNode)
        }
        if (nodeToRemove.rightNode.rightNode) {
          this.preorder(nodeToRemove.rightNode.rightNode)
        }
        nodeToRemove.data = nodeToRemove.rightNode.data
        nodeToRemove.rightNode = null
        this.currentOrder.forEach((reinsertData) => {
          this.insert(reinsertData)
        })
      } else {
        nodeToRemove = null
      }
      return this.root
    }

    search(node, value){
      if (!node) {
        return  "You didn't pass in a node."
      }
      if (node.data === value){
        return node
      }
      if (node.data < value) {
        if (node.rightNode) {
          return this.search(node.rightNode, value)
        } else {
          return 'The value is not in the tree'
        }
      } else {
        if (node.leftNode) {
          return this.search(node.leftNode, value)
        } else {
          return 'The value is not in the tree'
        }
      }
    }

    clearCurrentOrder() {
      this.currentOrder = []
    }

    // 3 depth first Traversals: inorder, preorder, postorder
    inorderHelper(node) {
      if (node.leftNode) {
        this.inorder(node.leftNode)
      }
      this.currentOrder.push(node.data)
      if (node.rightNode) {
        this.inorder(node.rightNode)
      }
    }

    inorder(node) {
      this.inorderHelper(node)
      const result = new Array
      this.currentOrder.forEach((num) => {
        result.push(num)
      })
      setTimeout(() => {
        this.clearCurrentOrder()
      }, 10)

      return result
    }

    preorder(node) {
      this.currentOrder.push(node.data)
      if (node.leftNode) {
        this.preorder(node.leftNode)
      }
      if (node.rightNode) {
        this.preorder(node.rightNode)
      }
    }

    postorder(node){
      if (node.leftNode) {
        this.postorder(node.leftNode)
      }
      if (node.rightNode) {
        this.postorder(node.rightNode)
      }
      this.currentOrder.push(node.data)
    }

    breadthFirstTraversal(node, nextNode = null){
      const bftQueue = new Queue()
      bftQueue.addItem(node)

      while (!bftQueue.isEmpty()){
        const frontNode = bftQueue.takeItem()
        this.currentOrder.push(frontNode.data)

        if (frontNode.leftNode) {
          bftQueue.addItem(frontNode.leftNode)
        }
        if (frontNode.rightNode) {
          bftQueue.addItem(frontNode.rightNode)
        }
      }
    }
    search(node, data) {
      if (!node) {
        return null
      }
      if (node.data === data) {
        return node
      }
      if (node.data > data) {
        return this.search(node.leftNode, data)
      } else {
        return this.search(node.rightNode, data)
      }
    }

    isBalanced(node) {
      if (!node.leftNode && !node.rightNode) {
        return true
      }
      let leftSubtreeDepth = 0
      let rightSubtreeDepth = 0
      if (node.leftNode) {
        leftSubtreeDepth = this.maxDepth(node.leftNode)
      }
      if (node.rightNode) {
        rightSubtreeDepth = this.maxDepth(node.rightNode)
      }
      return Math.abs(leftSubtreeDepth - rightSubtreeDepth) < 2
    }
}

// const geekstreetraversal = new BinarySearchTree()
// geekstreetraversal.insert(1)
// geekstreetraversal.root.rightNode = new Node(3)
// geekstreetraversal.root.leftNode = new Node(2)
// geekstreetraversal.root.leftNode.leftNode = new Node(4)
// geekstreetraversal.root.leftNode.rightNode = new Node(5)

// console.log('Inorder, [4, 2, 5, 1, 3]', geekstreetraversal.inorder(geekstreetraversal.root))
// geekstreetraversal.preorder(geekstreetraversal.root)
// console.log('Preorder (Root, Left, Right) : 1 2 4 5 3', geekstreetraversal.currentOrder)
// geekstreetraversal.clearCurrentOrder()
// geekstreetraversal.postorder(geekstreetraversal.root)
// console.log('Postorder (Left, Right, Root) : 4 5 2 3 1', geekstreetraversal.currentOrder)
//

const sampleBT = new BinarySearchTree()
sampleBT.insert(10)
sampleBT.insert(5)
sampleBT.insert(15)
sampleBT.insert(3)
sampleBT.insert(6)
sampleBT.insert(9)
sampleBT.insert(20)
sampleBT.insert(17)
sampleBT.insert(25)
sampleBT.insert(30)
sampleBT.insert(4)
sampleBT.insert(1)

//
// console.log(sampleBT.findMinNode(sampleBT.root))
// console.log(sampleBT.size(sampleBT.root))
// console.log(sampleBT.maxDepth(sampleBT.root))
// console.log(sampleBT.search(sampleBT.root, 4))
//

// console.log(sampleBT.konRemove(5))
//
// console.log(sampleBT.remove(sampleBT.root, 5))

// // //
// sampleBT.breadthFirstTraversal(sampleBT.root)
// console.log('breadthFirstTraversal: 10, 5, 15, 3, 6, 20, 1, 4, 9, 17, 25, 30 --- and is equal to:', sampleBT.currentOrder)

//
// console.log('search result: ', sampleBT.search(sampleBT.root, 25))
// console.log('is balanced: ', sampleBT.isBalanced(sampleBT.root))

// TODO: Still have to write a insert function that balances the tree while inserting
// See: https://appliedgo.net/balancedtree/
// See: https://www.cpp.edu/~ftang/courses/CS241/notes/self%20balance%20bst.htm
// See: https://www.geeksforgeeks.org/convert-normal-bst-balanced-bst
