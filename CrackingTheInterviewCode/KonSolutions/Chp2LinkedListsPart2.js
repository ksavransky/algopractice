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

function sumListsKonSolution(list1, list2) {
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

  const answer = parseInt(num1Array.reverse().join(''), 10) + parseInt(num2Array.reverse().join(''))
  const answerArray= answer.toString().split('').reverse()
  const answerList = new DoubleLinkedList()
  for (let i = 0; i < answerArray.length; i++) {
    answerList.insertNodeLast(new Node(parseInt(answerArray[i], 10)))
  }
  return answerList

}

// console.log(sumListsKonSolution(listNum1, listNum2))

function sumListsBetterSolution(list1, list2) {
  let carry = 0
  let list1Node = list1.head
  let list2Node = list2.head
  const answerList = new DoubleLinkedList()
  while(list1Node && list2Node) {
    const currentValue = list1Node.value + list2Node.value + carry
    const oneDigit = currentValue % 10
    carry = (currentValue - oneDigit) / 10
    answerList.insertNodeLast(new Node(oneDigit))
    list1Node = list1Node.next
    list2Node = list2Node.next
  }
  return answerList
}

// console.log(sumListsBetterSolution(listNum1, listNum2))


// pretend these are single linked list... obviously easier with double
const palindromeListEven = new DoubleLinkedList()
const palindromeListOdd = new DoubleLinkedList()
const notPalindromeListEven = new DoubleLinkedList()
const notPalindromeListOdd = new DoubleLinkedList()

const pN1 = new Node(1)
const pN2 = new Node(2)
const pN3 = new Node(3)
const pN1b = new Node(1)
const pN2b = new Node(2)
const pN3b = new Node(3)
const pN4 = new Node(4)

// palindromeListEven.insertNodeLast(pN1)
// palindromeListEven.insertNodeLast(pN2)
// palindromeListEven.insertNodeLast(pN3)
// palindromeListEven.insertNodeLast(pN3b)
// palindromeListEven.insertNodeLast(pN2b)
// palindromeListEven.insertNodeLast(pN1b)

// palindromeListOdd.insertNodeLast(pN1)
// palindromeListOdd.insertNodeLast(pN2)
// palindromeListOdd.insertNodeLast(pN3)
// palindromeListOdd.insertNodeLast(pN4)
// palindromeListOdd.insertNodeLast(pN3b)
// palindromeListOdd.insertNodeLast(pN2b)
// palindromeListOdd.insertNodeLast(pN1b)
//
// notPalindromeListEven.insertNodeLast(pN1)
// notPalindromeListEven.insertNodeLast(pN2)
// notPalindromeListEven.insertNodeLast(pN3)
// notPalindromeListEven.insertNodeLast(pN4)
// notPalindromeListEven.insertNodeLast(pN2b)
// notPalindromeListEven.insertNodeLast(pN1b)
//
// notPalindromeListOdd.insertNodeLast(pN1)
// notPalindromeListOdd.insertNodeLast(pN2)
// notPalindromeListOdd.insertNodeLast(pN4)
// notPalindromeListOdd.insertNodeLast(pN3b)
// notPalindromeListOdd.insertNodeLast(pN1b)

function isPalindrome(list) {
  if (!list.head) {
    return false
  }
  if (!list.head.next) {
    return true
  }
  if (!list.head.next.next) {
    return list.head.value === list.head.next.value
  }

  let currentNode = list.head
  let runnerNode = list.head.next
  let isEvenLengthList = true
  const halfwayArray = []
  while(runnerNode) {
    halfwayArray.push(currentNode.value)
    currentNode = currentNode.next
    if (runnerNode.next && !runnerNode.next.next) {
      isEvenLengthList = false
    }
    runnerNode = runnerNode.next ? runnerNode.next.next : false
  }

  const halfwayArrayReversed = halfwayArray.reverse()
  let index = 0

  currentNode = isEvenLengthList ? currentNode : currentNode.next
  while(currentNode) {
    if (currentNode.value !== halfwayArrayReversed[index]) {
      return false
    }
    index++
    currentNode = currentNode.next
  }
  return true
}

// console.log(isPalindrome(notPalindromeListOdd))
