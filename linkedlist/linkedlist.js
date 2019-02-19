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
dlist1.insert(4)
dlist1.insert(3)
dlist1.insert(2)
dlist1.insert(1)
console.log('in order', dlist1.print())

// BOOM great reverseLinkedList
function reverseLinkedList(list){
  let currentNode = list.head
  while (currentNode){
    const nextNode = currentNode.next
    const prevNode = currentNode.prev
    currentNode.next = prevNode
    currentNode.prev = nextNode
    list.head = currentNode // this is a the tricky part
    currentNode = nextNode
  }
}
reverseLinkedList(dlist1)
console.log('reverse order', dlist1.print())



class Node {
  constructor(value) {
    this.value = value
    this.next = null
    //On doubly linked list Node
    this.prev = null
  }
}

class SLinkedList {
  constructor(){
    this.head = null
    this.length = 0
  }

  insert(value){
    if (!value) {
      return
    }
    const newNode = new Node(value)
    if (!this.head) {
      this.head = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
    this.length++
  }

  delete(value){
    if (this.length === 0){
      return
    }
    if (this.head.value === value) {
      if(this.length === 1) {
        this.head = null
      } else {
        this.head = this.head.next
      }
    } else {
      let currentNode = this.head

      while (currentNode) {
        if (currentNode.next.value === value){
          if (currentNode.next.next) {
            currentNode.next = currentNode.next.next
          } else {
            currentNode.next = null
          }
          this.length--
          break
        }
        currentNode = currentNode.next
      }
    }
  }

  search(value){
    let found = null
    if (this.length === 0){
      found = "Can't find value because empty list."
    } else {
      currentNode = this.head

      while(currentNode){

        if(currentNode.value === value){
          return currentNode
          break
        }

        currentNode = currentNode.next
      }
    }
    return found
  }

  print(){
    let currentNode = this.head
    if (!currentNode) {
      return 'Linked List is Empty'
    }
    while(currentNode){
      console.log(currentNode.value)
      currentNode = currentNode.next
    }
  }

  reverse(){
    let currentNode = this.head;
    let previous = null;

    while(currentNode) {
      // save next or you lose it!!!
      let nextNode = currentNode.next
      // reverse pointer
      currentNode.next = previous
      // increment previous to current node
      previous = currentNode
      // increment node to next node or null at end of list
      currentNode = nextNode;
    }
    this.head = previous;
  }
}

class DLinkedList {
  constructor(head, tail){
    this.head = null
    this.tail = null
    this.length = 0
  }

  insert(value){
    if (!value) {
      return
    }
    const newNode = new Node(value)
    if (!this.head) {
      this.head = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
    if (!this.tail && this.length === 0){
      this.tail = newNode
    }
    this.length++
  }

  insertTail(value){
    if (!value) {
      return
    }
    const newNode = new Node(value)
    if (!this.tail && this.head) {
      this.tail = newNode
      this.head.next = this.tail
    } else if (!this.tail && !this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.length++
  }


  delete(value){
    if (this.length === 0){
      return
    }
    if(this.head.value = value){
      if(this.length === 1){
        this.head = null
        this.tail = null
      } else {
        let nextNode = this.head.next
        nextNode.prev = null
        this.head = nextNode
      }
    } else {
      let currentNode = this.head.next

      while(currentNode){
        if (currentNode.value === value){
          let nextNode = currentNode.next
          let prevNode = currentNode.prev

          if(nextNode){
            nextNode.prev = prevNode
            prevNode.next = nextNode
          } else {
            prevNode.next = null
            this.tail = prevNode
          }
          this.length--
          break
        }

        currentNode = currentNode.next
      }
    }
  }

  search(value){
    let found = null
    if (this.length === 0){
      found = "Can't find value because empty list."
    } else {
      currentNode = this.head

      while(currentNode){

        if(currentNode.value === value){
          return currentNode
          break
        }

        currentNode = currentNode.next
      }
    }
    return found
  }

  print(){
    let currentNode = this.head
    if (!currentNode) {
      return 'Linked List is Empty'
    }
    while(currentNode){
      console.log(currentNode.value)
      currentNode = currentNode.next
    }
  }

  reverse(){
    let currentNode = this.head;
    let previous = null;

    while(currentNode) {
      // save next or you lose it!!!
      let nextNode = currentNode.next
      // reverse pointer
      currentNode.next = previous
      // increment previous to current node
      previous = currentNode
      // increment node to next node or null at end of list
      currentNode = nextNode;
    }
    this.head = previous;
  }
}

let slist = new SLinkedList()
slist.insert(1)
slist.insert(2)
slist.insert(3)
// console.log(slist.head)
slist.print()

slist.reverse()
// console.log(slist.head)
slist.print()

// https://www.geeksforgeeks.org/top-20-linked-list-interview-question/

//https://medium.com/front-end-hacking/data-structures-linked-list-implementation-in-js-3beb48ff49cd
