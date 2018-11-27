// https://medium.com/basecs/heapify-all-the-things-with-heap-sort-55ee1c93af82


function heapSort(array) {
  // Build our max heap.
  buildMaxHeap(array);

  // Find last element.
  let lastElementIndex = array.length - 1;

  // Continue heap sorting until we have
  // just one element left in the array.
  while(lastElementIndex > 0) {
    // 0 index is the top of the heap --
    // which contains the largest value since we built a max heap!!!
    // so by swapping the largest value into the last spot
    // and then not including it in the next heapify call (see why below)
    // we are sorting!!!
    swap(array, 0, lastElementIndex);

    // NOTE: trick here is that by calling heapify with lastElement as third argument --
    // i.e. the max parameter (what the 3rd arg represents), we are removing the lastElement from the heapify function (i.e. not sorting the already sorted last element)
    heapify(array, 0, lastElementIndex);

    lastElementIndex -= 1
  }

  return array
}


function swap(array, firstItemIndex, lastItemIndex) {
  let tmp = array[firstItemIndex];

  // Swap first and last items in the array.
  array[firstItemIndex] = array[lastItemIndex];
  array[lastItemIndex] = tmp;
}

function heapify(heap, parentNodeIndex, max) {
  let savedIndex
  let leftChildIndex
  let rightChildIndex

  while(parentNodeIndex < max) {
    savedIndex = parentNodeIndex;

    leftChildIndex = 2 * parentNodeIndex + 1;
    rightChildIndex = leftChildIndex + 1;

    console.log('in heapify loop, array/heap is: ', heap)
    console.log('savedIndex -- which represents the savedIndex of the parent node we are checking', savedIndex)
    console.log('max -- i.e. max length of the array', max)
    console.log('leftChildIndex', leftChildIndex)
    console.log('rightChildIndex', rightChildIndex)

    // leftChildIndex < max means leftChildIndex is in the array and not the last element
    // heap[leftChildIndex] > heap[savedIndex] means leftChildIndex element (leftNode element) is greater than savedIndex (i.e. parent node) element
    if (leftChildIndex < max && heap[leftChildIndex] > heap[savedIndex]) {
      console.log('in leftChildIndex < max && heap[leftChildIndex] > heap[savedIndex]');
      console.log('GOING TO SWAP leftChildIndex and parentIndex')
      // We are swaping here because this means that the leftChild is greater than its parent node.
      // That is incorrect for a max heap where parents are supposed to be larger.
      // So swap using swap function at the end of this function.
      savedIndex = leftChildIndex;
    }

    if (rightChildIndex < max && heap[rightChildIndex] > heap[savedIndex]) {
      console.log('rightChildIndex < max && heap[rightChildIndex] > heap[savedIndex]');
      console.log('GOING TO SWAP rightChildIndex and parentIndex')
      savedIndex = rightChildIndex;
    }

    if (savedIndex === parentNodeIndex) {
      console.log('(savedIndex === parentNodeIndex) -- represents skipped conditions');
      console.log('NO SWAP WILL TAKE PLACE and break out of while loop');
      return;
    }

    // heap is the array.
    swap(heap, parentNodeIndex, savedIndex);

    parentNodeIndex = savedIndex;
  }
}

function buildMaxHeap(array) {
  let i = Math.floor(array.length / 2 - 1)
  // Build a max heap out of
  // all array elements passed in.
  while (i >= 0) {
    console.log('in buildMaxHeap loop, going to call heapify with i and array,', i, array);
    heapify(array, i, array.length)
    i -= 1;
  }

  return array
}

// console.log(buildMaxHeap([3, 19, 1, 14, 8, 7])) // [ 19, 14, 7, 3, 8, 1 ]
// NOTE: the drawing understandingHeapify is off by one.
// The result should be: [ 19, 14, 7, 3, 8, 1 ]

console.log('result of heapSort: ', heapSort([3, 19, 1, 14, 8, 7]))
