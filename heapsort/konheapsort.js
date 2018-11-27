function heapSort(array) {
  buildMaxHeap(array)

  let lastIndexElement = array.length - 1

  while(lastIndexElement > 0) {

    swap(array, 0, lastIndexElement)

    heapify(array, 0, lastIndexElement)

    lastIndexElement -= 1
  }

  return array
}

function swap(array, i, j) {
  let tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
}

function heapify(heap, parentNodeIndex, max) {
  let savedIndex
  let leftChildIndex
  let rightChildIndex

  while (parentNodeIndex < max) {
    savedIndex = parentNodeIndex
    leftChildIndex = 2 * parentNodeIndex + 1
    rightChildIndex = leftChildIndex + 1

    if (leftChildIndex < max && heap[leftChildIndex] > heap[savedIndex]) {
      savedIndex = leftChildIndex
    }

    if (rightChildIndex < max && heap[rightChildIndex] > heap[savedIndex]) {
      savedIndex = rightChildIndex
    }

    if (parentNodeIndex === savedIndex) {
      return
    }

    swap(heap, parentNodeIndex, savedIndex)

    parentNodeIndex = savedIndex
  }
}

function buildMaxHeap(array) {
  let parentNodeIndex = Math.floor(array.length / 2 - 1)

  while(parentNodeIndex >= 0){
    heapify(array, parentNodeIndex, array.length)

    parentNodeIndex -= 1
  }
}

console.log('result of heapSort: ', heapSort([3, 19, 1, 14, 8, 7]))
