import React, { Component } from 'react';
import { Link } from 'react-router';

import Title from 'components/Title';

import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      users: UserStore.getState().users,
      input: '',
      beginNewUser: false
    };
    this.beginNewUser = this.beginNewUser.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.handleUserStore);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.handleUserStore);
  }

  handleUserStore = (store) => {
    this.setState({
      users: store.users
    });
  };

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value
    });
  };

  addUser = () => {
    if (this.state.input !== '') {
      UserActions.add(this.state.input);
      this.setState({
        input: '',
        beginNewUser: false
      });
    }
  };

  beginNewUser(begin) {
    this.setState({
      beginNewUser: begin,
      input: ''
    });
  }

  render() {
    const { users, input, beginNewUser } = this.state;
    return (
      <div>
        <div className='new-user'>
          { beginNewUser ?
            <div>
              <input className='new-user__input' type='text' value={ input } onChange={ this.handleInputChange } autoFocus='true' />
              <button className='new-user__button submit' onClick={ this.addUser }>Add User</button>
              <button className='new-user__button back' onClick={ () => this.beginNewUser(false) }>Nevermind</button>
            </div>
          :
            <div onClick={ () => this.beginNewUser(true) }>
              <Title type={'create-new'}>
                Create A New User
              </Title>
            </div>
          }
        </div>
        <ul className='user-list'>
          { users.map((user, i) => {
            return (
              <li className='user-list__item' key={ i }>
                <Link to={`/user/${user}`}>
                  <Title type={'list-item'}>
                    { user }
                  </Title>
                </Link>
              </li>
            );})
          }
          </ul>
      </div>
    );
  }
}

export default Home;
