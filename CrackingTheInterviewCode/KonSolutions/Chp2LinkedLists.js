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

// const n1 = new Node(1)
// const n2a = new Node(2)
// const n2b = new Node(2)
// const n3 = new Node(3)
// const n4a = new Node(4)
// const n4b = new Node(4)
// const n5a = new Node(5)
// const n5b = new Node(5)
//
// const list = new DoubleLinkedList(n1)
// list.insertNodeLast(n2a)
// list.insertNodeLast(n2b)
// list.insertNodeLast(n3)
// list.insertNodeLast(n4a)
// list.insertNodeLast(n4b)
// list.insertNodeLast(n5a)
// list.insertNodeLast(n5b)
// console.log(list.printNodes())

// Write code to remove duplicates from an unsorted linked list.

function removeDups(list){
  if (!list) {
    return list;
  }

  const seenMap = {}
  let currentNode = list.head
  while (currentNode) {
    let nextNode = currentNode.next
    if (!seenMap[currentNode.value]) {
      seenMap[currentNode.value] = true
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

class SNode {
  constructor(value = null) {
    this.value = value
    this.next = null
  }
}

class SinglyLinkedList {
  constructor(node = null) {
    this.head = node
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

  printNodes(node = this.head) {
    if (!node) {
      return ''
    }
    return node.value + ' ' + this.printNodes(node.next)
  }

  clearList() {
    this.head = null
  }

  insertNodeLast(nodeToInsert) {
    if (!this.head) {
      this.head = nodeToInsert
    }
    let currentNode = this.head
    while (currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = nodeToInsert
    this.length += 1
  }
}


const sNode1 = new SNode(1)
const sNode2 = new SNode(2)
const sNode3 = new SNode(3)
const sNode4 = new SNode(4)
const sNode5 = new SNode(5)

const slist = new SinglyLinkedList(sNode1)
slist.insertNodeLast(sNode2)
slist.insertNodeLast(sNode3)
slist.insertNodeLast(sNode4)
slist.insertNodeLast(sNode5)
// console.log(slist.printNodes())

// Return Kth to Last:
// Implement an algorithm to find the kth to last element of a singly linked list.


// my thoughts: 2n algo would be run through it once, find length; run through again at length minus k
// 2n time and 0 additional space
// another possible algo: run through list putting each node into an array; then at at end can just access
// kth node via array length - k from array

function kToLast(k, list){
  let listLength = 0
  if (list.head) {
    let currentNode = list.head
    while (currentNode) {
      listLength += 1
      currentNode = currentNode.next
    }
  }
  if (listLength === 0) {
    return null
  }
  const kToLast = listLength - k
  if (kToLast < 0) {
    return null
  }
  if (kToLast === 0) {
    return list.head
  }
  let currentNodeIndex = 1
  let currentNode = list.head
  while (currentNodeIndex < kToLast) {
    currentNode = currentNode.next
    currentNodeIndex += 1
  }
  return currentNode
}

// console.log(kToLast(1, slist))

//Delete Middle Node: Implement an algorithm to delete a node in the middle
// (i.e., any node but the first and last node, not necessarily the exact middle) of a singly linked list,
// given only access to that node.
// EXAMPLE
// input:the node c from the linked lista->b->c->d->e->f
// Result: nothing is returned, but the new linked list looks like a->b->d->e->f

// my idea: don't know prev node, can't delete ref,
// so have to make deleted node next node
function deleteNodeInMiddle(node){
    const nextNode = node.next
    if (!node && !nextNode) {
      return "Invalid node"
    }
    node.value = nextNode.value
    node.next = nextNode.next
}

// deleteNodeInMiddle(sNode3)
// console.log(slist.printNodes())

// Partition: Write code to partition a linked list around a value x,
// such that all nodes less than x come before all nodes greater than or equal to x.
// If x is contained within the list, the values of x only need to be after the elements less than x (see below).
// The partition element x can appear anywhere in the "right partition";
// it does not need to appear between the left and right partitions.
// EXAMPLE: [partition=5]
// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8

// const n1 = new Node(1)
// const n2 = new Node(2)
// const n3 = new Node(3)
// const n5a = new Node(5)
// const n5b = new Node(5)
// const n8 = new Node(8)
// const n10 = new Node(10)
//
// const list = new SinglyLinkedList(n3)
// list.insertNodeLast(n5a)
// list.insertNodeLast(n8)
// list.insertNodeLast(n5b)
// list.insertNodeLast(n10)
// list.insertNodeLast(n2)
// list.insertNodeLast(n1)

// console.log(list)
// console.log(list.printNodes())

// This works but is ugly and give wrong order
// function partition(list, partitionValue) {
//   if (!list.head) {
//     return null
//   }
//   const leftPartition = []
//   const rightPartition = []
//
//   let currentNode = list.head
//   for (let i = 0; i < list.length; i++) {
//     if (currentNode.value >= partitionValue) {
//       rightPartition.push(currentNode)
//     } else {
//       leftPartition.push(currentNode)
//     }
//     currentNode = currentNode.next
//   }
//
//   leftPartition.forEach((node, index) => {
//     if (index === 0) {
//       node.prev = null
//     } else {
//       node.prev = leftPartition[index - 1]
//     }
//     if (index + 1 === leftPartition.length) {
//       node.next = null
//     } else {
//       node.next = leftPartition[index + 1]
//     }
//   })
//
//   rightPartition.forEach((node, index) => {
//     if (index === 0) {
//       node.prev = null
//     } else {
//       node.prev = rightPartition[index - 1]
//     }
//     if (index + 1 === rightPartition.length) {
//       node.next = null
//     } else {
//       node.next = rightPartition[index + 1]
//     }
//   })
//
//   if (leftPartition.length > 0 && rightPartition.length > 0) {
//     leftPartition[leftPartition.length - 1].next = rightPartition[0]
//     rightPartition[0].prev = leftPartition[leftPartition.length - 1]
//   }
//
//   if (leftPartition.length > 0) {
//     return leftPartition[0]
//   } else {
//     return rightPartition[0]
//   }
// }

export function partition(list, val) {
  let node = list,
    smallerHead, smallerTail, largerHead, largerTail;

  smallerHead = smallerTail = largerHead = largerTail = null;
  while (node) {
    let next = node.next;
    node.next = null;
    if (node.val >= val) {
      if (!largerTail) {
        largerHead = largerTail = node;
      } else {
        largerTail = largerTail.next = node;
      }
    } else if (node.val < val) {
      if (!smallerHead) {
        smallerHead = smallerTail = node;
      } else {
        smallerTail = smallerTail.next = node;
      }
    }
    node = next;
  }

  if (smallerTail) {
    smallerTail.next = largerHead;
  }
  return smallerHead || largerHead;
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

function sumLists(list1, list2)
