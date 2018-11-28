class Node {
  constructor(value, leftChild, rightChild){
    this.value = value
    this.leftChild = leftChild || null
    this.rightChild = rightChild || null
  }
}

class BinaryTree {
  constructor(rootValue) {
    this.root = rootValue ? new Node(rootValue) : null
  }

  insertHelper(newNode, currentNode){
    if (currentNode.value > newNode.value){
      if (!currentNode.leftChild) {
        currentNode.leftChild = newNode
      } else {
        this.insertHelper(newNode, currentNode.leftChild)
      }
    } else {
      if (!currentNode.rightChild) {
        currentNode.rightChild = newNode
      } else {
        this.insertHelper(newNode, currentNode.rightChild)
      }
    }
  }

  insert(value){
    const newNode = new Node(value)
    if (!this.root) {
      this.root = newNode
    } else {
      this.insertHelper(newNode, this.root)
    }
  }

  findMinNode(node){
    const currentNode = node || this.root

    if (!currentNode.leftChild){
      return currentNode
    } else {
      return this.findMinNode(currentNode.leftChild)
    }
  }

  deleteHelper(value, currentNode, parentNode) {
    if (currentNode.value > value) {
      if (currentNode.leftChild) {
        this.deleteHelper(value, currentNode.leftChild, currentNode)
      }
    } else if (currentNode.value < value) {
      if (currentNode.rightChild) {
        this.deleteHelper(value, currentNode.rightChild, currentNode)
      }
    } else {
      // currentNode.value === value
      // deleting node with no children
      if (!currentNode.leftChild && !currentNode.rightChild) {
        if (!parentNode) {
          // if no parent and no children that means we are at the root.
          // so delete it.
          this.root = null
        } else {
          if (parentNode.leftChild && parentNode.leftChild.value === currentNode.value) {
            parentNode.leftChild = null
          } else {
            parentNode.rightChild = null
          }
        }
      } else if (currentNode.leftChild && currentNode.rightChild) {
        // deleting node that has 2 children
        // NOTE: trick here is to get minNode of currentNode's right children
        // and substitute it's value with rightChildMinNode value
        // also need to check if rightChildMinNode has a right child
        // and replace currentNode's right child with it, if it does
        // rightChildMinNode cannot by definition have a left child because it would be smaller
        const rightChildMinNode = this.findMinNode(currentNode.rightChild)
        currentNode.value = rightChildMinNode.value
        if (rightChildMinNode.rightChild) {
          currentNode.rightChild = rightChildMinNode.rightChild
        }
      } else if (currentNode.leftChild && !currentNode.rightChild) {
        // if currentNode only has left child, replace the parent node's link with it
        // have to check if the deleted/currentNode is the left child or right child of parent
        if (parentNode.leftChild && parentNode.leftChild.value === currentNode.value) {
          parentNode.leftChild = currentNode.leftChild
        } else {
          parentNode.rightChild = currentNode.leftChild
        }
      } else if (!currentNode.leftChild && currentNode.rightChild) {
        if (parentNode.leftChild && parentNode.leftChild.value === currentNode.value) {
          parentNode.leftChild = currentNode.rightChild
        } else {
          parentNode.rightChild = currentNode.rightChild
        }
      }
    }
  }

  delete(value){
    // algo is find node to delete while keeping track of parentNode
    // if node to delete has no children, just delete
    // if node to delete has only one child, that child takes its place
    // if node to delete has two children, replace it with right node's min node
    if (!this.root) {
      return null
    } else {
      this.deleteHelper(value, this.root, null)
      return this.root
    }
  }

  search(value, node) {
    node = node || this.root
    if (node.value === value) {
      return node
    } else if (node.value > value) {
      if (node.leftChild) {
        return this.search(value, node.leftChild)
      } else {
        return null
      }
    } else {
      if (node.rightChild) {
        return this.search(value, node.rightChild)
      } else {
        return null
      }
    }
  }

  depthFirstTravesalHelper(traversal, currentNode, type) {
    if (type === 'pre') {
      traversal.push(currentNode.value)
    }
    if (currentNode.leftChild){
      this.depthFirstTravesalHelper(traversal, currentNode.leftChild, type)
    }
    if (type === 'inorder') {
      traversal.push(currentNode.value)
    }
    if (currentNode.rightChild){
      this.depthFirstTravesalHelper(traversal, currentNode.rightChild, type)
    }
    if (type === 'post') {
      traversal.push(currentNode.value)
    }
  }

  depthFirstTravesal(type = 'pre') {
    const traversal = []
    if (this.root) {
      this.depthFirstTravesalHelper(traversal, this.root, type)
    }
    return traversal
  }

  breadthFirstTraversal(){
    if (!this.root) {
      return []
    }
    const traversal = []
    const queue = []

    queue.unshift(this.root)

    while (queue.length > 0) {
      let currentNode = queue.pop()
      traversal.push(currentNode.value)

      if (currentNode.leftChild) {
        queue.unshift(currentNode.leftChild)
      }

      if (currentNode.rightChild) {
        queue.unshift(currentNode.rightChild)
      }
    }

    return traversal
  }
}

// const geekstreetTree = new BinaryTree()
// geekstreetTree.insert(1)
// geekstreetTree.root.rightChild = new Node(3)
// geekstreetTree.root.leftChild = new Node(2)
// geekstreetTree.root.leftChild.leftChild = new Node(4)
// geekstreetTree.root.leftChild.rightChild = new Node(5)
//
// console.log('pre order, 1 2 4 5 3: ', geekstreetTree.depthFirstTravesal('pre'))
// console.log('in order, 4 2 5 1 3: ', geekstreetTree.depthFirstTravesal('inorder'))
// console.log('post order, 4 5 2 3 1: ', geekstreetTree.depthFirstTravesal('post'))
// --------------
// --------------
// --------------
//
const sampleBT = new BinaryTree()
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
// console.log('breadthFirstTraversal: 10, 5, 15, 3, 6, 20, 1, 4, 9, 17, 25, 30 --- and is equal to:', sampleBT.breadthFirstTraversal())


// console.log(sampleBT.delete(10))
// console.log(sampleBT.delete(6))
// console.log(sampleBT.delete(4))
