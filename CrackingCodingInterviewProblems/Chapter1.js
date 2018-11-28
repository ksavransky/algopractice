// Implement an algorithm to determine if a string has all unique characters What if you can not use additional data structures?

function allUnique(str){
  const chars = {}
  for (let i = 0; i < str.length; i++) {
    console.log(i)
    if(chars[str[i]]){
      return false
    } else {
      chars[str[i]] = 1
    }
  }
  return true
}

console.log(allUnique('aasdf'))
