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
    this.length = node ? 1 : 0
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
    this.length += 1
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
    if (nodeToDelete) {
      this.length -= 1
    }
  }
}


// EXAMPLE: [partition=5]
// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
// console.log(partition(list, 5))

//You have two numbers represented by a linked list, where each node contains a single digit.
// The digits are stored in reverse order, such that the 1 's digit is at the head of the list.
//  Write a function that adds the two numbers and returns the sum as a linked list.
// Input: (7-> 1 -> 6) + (5 -> 9 -> 2). That is, 617 + 295.
// Output: 2 -> 1 -> 9. That is, 912.

const listNum1 = new DoubleLinkedList()
const listNum2 = new DoubleLinkedList()
const sN1 = new Node(1)
const sN2 = new Node(2)
const sN5 = new Node(5)
const sN6 = new Node(6)
const sN7 = new Node(7)
const sN9 = new Node(9)

listNum1.insertNodeLast(sN7)
listNum1.insertNodeLast(sN1)
listNum1.insertNodeLast(sN6)

listNum2.insertNodeLast(sN5)
listNum2.insertNodeLast(sN9)
listNum2.insertNodeLast(sN2)

function sumLists(list1, list2) {
  const num1Array = []
  let currentNode = list1.head
  while (currentNode) {
    num1Array.push(currentNode.value)
    currentNode = currentNode.next
  }

  const num2Array = []
  currentNode = list2.head
  while (currentNode) {
    num2Array.push(currentNode.value)
    currentNode = currentNode.next
  }

  console.log('num1Array', num1Array)
  console.log('num2Array', num2Array)
}

sumLists(listNum1, listNum2)
