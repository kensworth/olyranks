import React from 'react';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
