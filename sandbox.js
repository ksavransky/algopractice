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
    if (!this.head) {
      this.head = node
      node.prev = null
      node.next = this.tail
    } else if (!this.tail) {
      this.tail = node
      this.head.next = this.tail
      this.tail.prev = this.head
      this.tail.next = null
    } else {
      
    }
  }

  insertInOrder(node) {
    // write it
  }
}


function reverseLinkedList(list){

}
