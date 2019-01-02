
/**
 * TripleStack class holds 3 stacks in one array. This is done by interleaving
 * the values from the 3 indexes, so the first items are at 0, 1 and 2 and
 * subsequent items are every 3 places from those. This class takes advantage
 * of the fact that JavaScript arrays are dynamic and doesn't hold the stacks
 * to any size. It doesn't reduce the size of the underlying array when items
 * are popped but that could easily be added.
 *
 * Time: push O(1), pop O(1), peek O(1)
 * Additional space: push O(1), pop O(1), peek O(1)
 */
export class TripleStack {
  constructor() {
    this._array = [];
    this._lengths = [0, 0, 0];
  }

  _getLength(stack) {
    return this._lengths[stack - 1];
  }

  push(stack, value) {
    let idx = this._getLength(stack) * 3 + stack - 1;
    this._array[idx] = value;
    ++this._lengths[stack - 1];
  }

  pop(stack) {
    let length = this._getLength(stack),
      value;
    if (length > 0) {
      let idx = (length - 1) * 3 + stack - 1;
      value = this._array[idx];
      this._array[idx] = undefined;
      --this._lengths[stack - 1];
    }
    return value;
  }

  peek(stack) {
    let length = this._getLength(stack),
      value;
    if (length > 0) {
      let idx = (length - 1) * 3 + stack - 1;
      value = this._array[idx];
    }
    return value;
  }

  isEmpty(stack) {
    return this._getLength(stack) === 0;
  }
}


// How would you design a stack which, in addition to push and pop, has a function min which returns the minimum element?
// Push, pop and min should all operate in 0(1) time.


/**
 * MinStack maintains a current stack minimum by putting an object on the stack
 * that holds the value and the minimum at that time rather than just the value.
 * When items are popped the value is returned without the wrapping object. When
 * minimum is called we return the min property of the wrapping object.
 *
 * Time: push O(1), pop O(1), peek O(1), min O(1)
 * Additional space: push O(N), pop O(1), peek O(1), min O(1)
 * Additional space required in push to create wrapping object to hold min at
 * that point.
 */
class MinStack {
  constructor() {
    this._stack = [];
  }

  push(value) {
    let min = this.min();
    this._stack.push({
      value: value,
      min: Math.min(min !== undefined ? min : Number.POSITIVE_INFINITY, value)
    });
  }

  pop() {
    if (!this.isEmpty()) {
      let item = this._stack.pop();
      return item.value;
    }
  }

  peek() {
    if (!this.isEmpty()) {
      let item = this._stack[this._stack.length - 1];
      return item.value;
    }
  }

  min() {
    if (!this.isEmpty()) {
      let item = this._stack[this._stack.length - 1];
      return item.min;
    }
  }

  isEmpty() {
    return this._stack.length === 0;
  }
}




class SetOfStacks {
  constructor(maxItemsPerStack){
    this.maxItemsPerStack = maxItemsPerStack
    this.stacks = [[]]
  }

  push(value) {
    let stackWithSpace = null
    let i = 0
    while(this.stacks[i]){
      if (this.stacks[i].length < this.maxItemsPerStack) {
        stackWithSpace = i
      }
      i++
    }
    if(stackWithSpace !== null){
      this.stacks[stackWithSpace].push(value)
    } else {
      this.stacks.push([value])
    }
    return this.stacks
  }

  pop() {
    const lastStackIndex = this.stacks.length - 1
    const poppedValue = this.stacks[lastStackIndex].pop()
    if (this.stacks[lastStackIndex].length === 0){
      this.stacks.pop()
    }

    return poppedValue
  }

  popAt(index){
    const poppedValue = this.stacks[index].pop()
    if (this.stacks[index].length === 0){
      this.stacks.splice(index, 1)
    }
    return poppedValue
  }
}

// const sos1 = new SetOfStacks(3)
// sos1.push(1)
// sos1.push(2)
// sos1.push(3)
// sos1.push(4)
// sos1.push(5)
// sos1.push(6)
// sos1.push(7)
// sos1.push(8)
// sos1.push(9)
// sos1.pop()
// sos1.pop()
// sos1.pop()
// sos1.pop()
// sos1.pop()
// sos1.push(5)
// sos1.push(6)
// console.log(sos1.push(7))

/**
 * Uses two different queues one for dogs and one for cats. Each entry is
 * assigned a unique identifier which allows dequeueAny to determine which of
 * the two queues to dequeue an item from.
 *
 * N = number of animals
 * Time: enqueue O(1), dequeue O(1), dequeueAny O(1)
 * Additional space: enqueue O(N), dequeue O(1), dequeueAny O(1)
 * Additional space required to hold unique id per animal.
 */
export class AnimalShelter {
  constructor() {
    this._dogs = [];
    this._cats = [];
    this._id = 0;
  }

  enqueueCat(name) {
    this._cats.push({
      name: name,
      id: ++this._id
    });
  }

  enqueueDog(name) {
    this._dogs.push({
      name: name,
      id: ++this._id
    });
  }

  dequeueAny() {
    let dogId = this._dogs.length > 0 ? this._dogs[0].id : Number.POSITIVE_INFINITY,
      catId = this._cats.length > 0 ? this._cats[0].id : Number.POSITIVE_INFINITY;

    if (dogId !== Number.POSITIVE_INFINITY || catId !== Number.POSITIVE_INFINITY) {
      if (dogId < catId) {
        return this._dogs.shift().name;
      }
      else {
        return this._cats.shift().name;
      }
    }
  }

  dequeueCat() {
    return this._cats.shift().name;
  }

  dequeueDog() {
    return this._dogs.shift().name;
  }
}
