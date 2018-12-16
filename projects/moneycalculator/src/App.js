import React, { Component } from 'react';
import './App.css'

const CalculatorInput = (props) => {
  let getDisplayValue = (value) => {
    if (value.length > 0) {
      return "$" + parseInt(value).toLocaleString()
    } else {
      return value
    }
  }
  return (
    <div>
      <span>Input {props.inputNumber}</span>
      <input value={getDisplayValue(props.value[props.inputNumber])} onChange={(event) => props.onChange(event.target.value, props.inputNumber)} />
    </div>
  )
}

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputs: {
        1: '',
        2: '',
      }
    }
  }

  setValue = (input, inputNumber) => {
    const newInputs = Object.assign({}, this.state.inputs)
    newInputs[inputNumber] = input.replace(/[^0-9]/gi, '')
    this.setState({
      inputs: newInputs
    })
  }

  sumInputs = () => {
    const inputKeys = Object.keys(this.state.inputs)
    let result = 0
    inputKeys.forEach((key) => {
      result += parseInt(this.state.inputs[key])
    })
    return result ? "$" + result : 'Please enter two numbers'
  }

  render() {
    return (
      <div className="App">
        <CalculatorInput inputNumber={1} value={this.state.inputs} onChange={this.setValue}/>
        <CalculatorInput inputNumber={2} value={this.state.inputs} onChange={this.setValue}/>
        <div>{this.sumInputs()}</div>
      </div>
    )
  }
}

export default Calculator
