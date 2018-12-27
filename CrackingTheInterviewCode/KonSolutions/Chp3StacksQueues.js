'use strict';

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

'use strict';

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
export class MinStack {
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
