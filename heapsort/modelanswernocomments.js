// https://medium.com/basecs/heapify-all-the-things-with-heap-sort-55ee1c93af82

function heapSort(array) {

  buildMaxHeap(array)

  let lastElementIndex = array.length - 1

  while (lastElementIndex > 0) {
    swap(array, 0, lastElementIndex)

    heapify(array, 0, lastElementIndex)

    lastElementIndex -= 1
  }

  return array
}


function swap(array, firstItemIndex, lastItemIndex) {
  let tmp = array[firstItemIndex]
  array[firstItemIndex] = array[lastItemIndex]
  array[lastItemIndex] = tmp
}

function heapify(heap, parentNodeIndex, max) {
  let savedIndex
  let leftChildIndex
  let rightChildIndex

  while (parentNodeIndex < max) {
    savedIndex = parentNodeIndex
    leftChildIndex = 2 * parentNodeIndex + 1
    rightChildIndex = leftChildIndex + 1

    if (leftChildIndex < max && heap[leftChildIndex] > heap[savedIndex]){
      savedIndex = leftChildIndex
    }

    if (rightChildIndex < max && heap[rightChildIndex] > heap[savedIndex]){
      savedIndex = rightChildIndex
    }

    if (savedIndex === parentNodeIndex) {
      return
    }

    swap(heap, parentNodeIndex, savedIndex)

    parentNodeIndex = savedIndex
  }

}

function buildMaxHeap(array) {
  let i = Math.floor(array.length / 2 - 1)

  while (i >= 0) {
    heapify(array, i, array.length)
    i -= 1;
  }
}

console.log('result of heapSort: ', heapSort([3, 19, 1, 14, 8, 7]))
