import React, { Component } from 'react';

import Nav from 'components/Nav';

class Root extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <div className='content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Root;
