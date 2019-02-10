import React, { Component } from 'react';
import monkey from './monkey.png'
import './App.css';

// https://github.com/ksavransky/cssfloatsexample

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="board">
          <div className="nigiri">
            <h1>/ / / / /</h1>
          </div>
          <div className="nigiri">
            <h1>/ / / / /</h1>
          </div>
          <div className="nigiri">
            <h1>/ / / / /</h1>
          </div>
          <div className="soup"></div>
        </div>
        <div className="board">
          <div className="nigiri-plate">
            <div className="nigiri">
              <h1>/ / / / /</h1>
            </div>
            <div className="nigiri">
              <h1>/ / / / /</h1>
            </div>
            <div className="nigiri">
              <h1>/ / / / /</h1>
            </div>
          </div>
          <div className="soup"></div>
        </div>
        <div className="article">
          <div className="images">
            <img className="monkey1" src={monkey} />
            <img className="monkey2" src={monkey} />
          </div>
          <div className="text">
Lorem ipsum dolor sit amet, leo consectetuer ultricies felis amet. Nibh arcu pellentesque nibh mattis. Augue ut proin, metus erat commodo mollis ligula. Proident eget sagittis, lobortis fringilla pede egestas eros consectetuer, suscipit atque, ut bibendum. Laborum nulla justo. Sit ante.
Amet wisi diam nibh, congue aenean quis lobortis, risus nec vel elit a in, adipiscing nunc. Nisl morbi nullam convallis, mollis augue ipsum egestas fusce nisl dictum, at in et diam faucibus, ultrices vel nec, in fringilla eu donec euismod cursus. Nullam tincidunt. In gravida, non ipsum dui, neque risus laoreet dignissim. Gravida suscipit dolor convallis id molestie turpis, euismod mi augue viverra erat at lectus.
Tellus lacus. Laoreet sem sodales scelerisque dis, magna sed sapien nulla lacus viverra, erat elementum bibendum pretium senectus, in turpis vitae amet in erat. Quia amet neque risus, lacus lectus elit. Egestas sed iste pellentesque sed mi bibendum, tristique pretium consectetuer urna, nunc proin vivamus tristique, bibendum magna commodo maecenas eget at. Porta porta ut, amet sem libero netus tempus duis ac, lacinia maecenas pede, leo orci elementum sit mauris, tortor ac. Nullam odio in dolor lacus erat, ornare netus rhoncus vitae magna, duis nunc enim praesent mauris. Etiam quis amet praesent lectus, felis lectus vestibulum. Hendrerit vivamus vehicula, odio pellentesque massa senectus pede, pretium accumsan.
          </div>
        </div>
      </div>
    );
  }
}

export default App;
