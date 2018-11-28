// see http://mattsnider.com/use-a-string-buffer-for-better-performance/

// read the article but basically this is more efficient than using .concat or += when combining strings

class StringBuffer {
  constructor(){
    this.buffer = []
    this.index = 0
  }

  append(string){
    this.buffer[this.index] = string
    this.index += 1
    return this
  }

  toString(){
    return this.buffer.join('')
  }
}

let buffer = new StringBuffer()
buffer.append('h')
buffer.append('i')
buffer.append(' ')
buffer.append('m')
buffer.append('a')
buffer.append('n')
console.log(buffer.toString())
