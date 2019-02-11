import React, { Component } from 'react';

const DATA = [
  {header: 'SJ',
   body: 'Sharks',
  },
  {header: 'LA',
   body: 'Kings',
  },
  {header: 'Chicago',
   body: 'Black Hawks',
  },
]

// render props work very similarly to a HOC
// let's you abstract what components are passed in and combine them with preset props

// using render props
// pass render props defined in TabsRenderProps to any children components via a function like so:
class App extends Component {
  render() {
    return (
      <div className="App">
        <TabsRenderProps
          render={renderProps => ( // WOW RENDER PROPS!
            <div>
              <TabsOnTop {...renderProps} tabInformation={DATA} />
              <TabsBody {...renderProps} />
            </div>
        )}/>
      </div>
    );
  }
}


// implement a component that works with render props
// this component is very similar to an HOC in functionality
class TabsRenderProps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0,
    }
  }

  setTab = (tabNumber) => this.setState({currentTab: tabNumber})

  render() {
    // create render props to pass to any child components
    // note: not using the this.props.children, just this.props.render
    const currentBody = DATA[this.state.currentTab].body
    const renderProps = {
      content: currentBody,
      tabInformation: DATA,
      setTab: this.setTab,
      currentTab: this.state.currentTab,
    }
    return (
      <div>
        {this.props.render(renderProps)}  // WOW RENDER PROPS!
      </div>
    )
  }
}

class TabsBody extends Component {
  render() {
    return (
      <div className="tabs-body">
        {this.props.content}
      </div>
    );
  }
}

class TabsOnTop extends Component {
  render() {
    console.log('this.props', this.props)
    return (
      <ul className="tabs-on-top">
        {
          this.props.tabInformation.map((tab, index) => {
            return <li key={tab.header} className={index === this.props.currentTab ? 'active' : ''} onClick={() => this.props.setTab(index)}>{tab.header}</li>
          })
        }
      </ul>
    );
  }
}

export default App;
