import React, { Component } from 'react';
import { Link } from 'react-router';
import Title from 'components/Title';

class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <Link to={'/'}>
          <Title type='nav'>Users</Title>
        </Link>
      </nav>
    );
  }
}

export default Nav;
