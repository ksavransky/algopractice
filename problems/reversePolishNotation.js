// Evaluate the value of an arithmetic expression in Reverse Polish Notation.
//
// Valid operators are +, -, *, /. Each operand may be an integer or another expression.
//
// Note:
//
//     Division between two integers should truncate toward zero.
//     The given RPN expression is always valid. That means the expression would always evaluate to a result and there won't be any divide by zero operation.

// Example 1:
//
// Input: ["2", "1", "+", "3", "*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9
//
// Example 2:
//
// Input: ["4", "13", "5", "/", "+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6
//
// Example 3:
//
// Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
// Output: 22
// Explanation:
//   ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22

function RPN(seq) {

  if (seq.length <= 2) {
    return 'Please enter valid RPN'
  }

  let operands = ['+', '-', '*', '/' ]
  let stack = []

  stack.push(seq[0])

  let i = 1

  while(i <= seq.length) {
    let item = seq[i]
    let index = operands.indexOf(item)
    // check if item is an operand
    if (index === -1) {
      // not an operand, so number, push onto stack
      stack.push(seq[i])
    } else {
      let a = parseInt(stack.pop(), 10)
      let b = parseInt(stack.pop(), 10)
      // addition
      if (index == 0) {
        stack.push(b + a)
      }
      // subtraction
      if (index == 1) {
        // notice b first - a
        stack.push(b - a)
      }
      // multiplication
      if (index == 2) {
        stack.push(b * a)
      }
      // division
      if (index == 3) {
        stack.push(b / a)
      }
    }
    i++
  }

  return stack[0]
};

console.log(RPN(["2", "1", "+", "3", "*"])) // 9
console.log(RPN(["4", "13", "5", "/", "+"])) // 6
console.log(RPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])) // 22
console.log(RPN(["2", "1"])) // Please enter valid RPN undefined
