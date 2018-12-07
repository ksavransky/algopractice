class Node {
  constructor(value = null) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class DoubleLinkedList {
  constructor(node = null) {
    this.head = node
    this.tail = null
  }

  searchHelper(value, node){
    if (node.value === value) {
      return node
    } else if (node.next) {
      return this.searchHelper(value, node.next)
    } else {
      return null
    }
  }

  search(value) {
    if (!this.head) {
      return null
    }
    return this.searchHelper(value, this.head)
  }

  insertNodeLast(node) {
    if (!this.head) {
      this.head = node
    } else if (!this.tail) {
      node.prev = this.head
      this.head.next = node
      this.tail = node
    } else {
      let lastTail = this.tail
      lastTail.next = node
      this.tail = node
      this.tail.prev = lastTail
    }
    return this.head
  }

  printNodes(node = this.head) {
    if (!node) {
      return ''
    }
    return node.value + ' ' + this.printNodes(node.next)
  }

  clearList() {
    this.head = null
    this.tail = null
  }

  deleteNode(value){
    const nodeToDelete = this.search(value)
    const previousNode = nodeToDelete.prev
    const nextNode = nodeToDelete.next
    if (previousNode) {
      previousNode.next = nextNode
    } else if (nextNode) {
      nextNode.prev = previousNode
    }
  }
}

const n1 = new Node(1)
const n2a = new Node(2)
const n2b = new Node(2)
const n3 = new Node(3)
const n4a = new Node(4)
const n4b = new Node(4)
const n5a = new Node(5)
const n5b = new Node(5)

const list = new DoubleLinkedList(n1)
list.insertNodeLast(n2a)
list.insertNodeLast(n2b)
list.insertNodeLast(n3)
list.insertNodeLast(n4a)
list.insertNodeLast(n4b)
list.insertNodeLast(n5a)
list.insertNodeLast(n5b)
// console.log(list.printNodes())

// Write code to remove duplicates from an unsorted linked list.

function removeDups(list){
  const nodeValuesMap = {}
  let currentNode = list.head
  while (currentNode) {
    let nextNode = currentNode.next
    if (!nodeValuesMap[currentNode.value]) {
      nodeValuesMap[currentNode.value] = true
    } else {
      const previousNode = currentNode.prev
      if (previousNode) {
        previousNode.next = nextNode
      } else if (nextNode) {
        nextNode.prev = previousNode
      }
    }

    currentNode = nextNode
  }

  return list
}
// 
// removeDups(list)
// console.log(list.printNodes())
