class LLNode {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class DoubleLinkedList {
  constructor(head){
    this.head = head || null
    this.tail = null
  }

  insert(node){
    if (typeof node === 'number') {
      node = new LLNode(node)
    }
    if (!this.head) {
      this.head = node
      node.prev = null
      node.next = null
    } else if (!this.tail) {
      this.tail = this.head
      this.tail.prev = node
      this.tail.next = null
      this.head = node
      this.head.next = this.tail
      this.head.prev = null
    } else {
      node.next = this.head
      this.head.prev = node
      this.head = node
    }
  }

  print() {
    let currentNode = this.head
    const list = []
    while (currentNode) {
      list.push(currentNode.value)
      currentNode = currentNode.next
    }
    return list
  }
}

const dlist1 = new DoubleLinkedList()
dlist1.insert(1)
dlist1.insert(2)
dlist1.insert(3)
dlist1.insert(4)
console.log('in order', dlist1.print())


function reverseLinkedList(list){
  let currentNode = this.head
  while (currentNode){
    const nextNode = currentNode.next
    const prevNode = currentNode.prev

  }
}

// console.log('reverse order', dlist1.print())
