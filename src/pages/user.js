import React, { Component } from 'react';

import Title from 'components/Title';
import { Link } from 'react-router';

import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

class User extends Component {

  constructor() {
    super();
    this.state = {
      user: false,
      editing: false,
      err: false
    };

    this.beginEditing = this.beginEditing.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const user = UserStore.getState().users.filter(user => user === this.props.params.id);
    if (user.length !== 0) {
      this.setState({user: user[0], initial: user[0]})
    }
  }

  beginEditing() {
    this.setState({editing: true});
  }

  handleEdit(value) {
    this.setState({user: value});
  }

  handleSave() {
    const sameAsInitial = this.state.initial === this.state.user;
    const userNameExists = UserStore.getState().users.findIndex(u => u === this.state.user);

    if (sameAsInitial) {
      this.setState({editing: false})
    }
    else if (userNameExists > -1) {
      this.setState({ err: true });
    }
    else {
      UserActions.update(this.state.initial, this.state.user);
      this.props.history.push('/');
    }
  }

  handleDelete() {
    UserActions.delete(this.state.user);
    this.props.history.push('/');
  }



  render() {
    return (
      <div>
      { this.state.user !== false ?
        <div className='new-user'>
          { this.state.editing ?
            <div>
              <input
                className='new-user__input'
                type='text'
                autoFocus='true'
                onChange={ (e) => this.handleEdit(e.target.value) }
                value={ this.state.user } />
              { this.state.err ?
                <p>username exists</p>
              :
                null
              }
              <button className='new-user__button submit' onClick={ this.handleSave }>Save</button>
            </div>
          :
            <div>
            <div className='user-detail'>
              <Title type={'detail'}>
                {this.state.user}
              </Title>
              <button className='new-user__button submit' onClick={ this.beginEditing }>Edit</button>
              <button className='new-user__button back' onClick={ this.handleDelete }>Delete</button>
            </div>
            </div>
          }
          <Link to={'/'}>
            <Title type='back'>
              ← Back to Users
            </Title>
          </Link>
        </div>
      :
        <p>404</p>
      }
      </div>
    );
  }
}

export default User;
