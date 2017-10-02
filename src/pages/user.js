import React, { Component } from 'react';

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
        <div>
          { this.state.editing ?
            <div>
              <input
                type='text'
                autoFocus='true'
                onChange={ (e) => this.handleEdit(e.target.value) }
                value={ this.state.user } />
              { this.state.err ?
                <p>username exists</p>
              :
                null
              }
              <p onClick={this.handleSave}>save</p>
            </div>
          :
            <div>
              <h3>{this.state.user}</h3>
              <p onClick={ this.beginEditing }>edit</p>
              <p onClick={ this.handleDelete }>delete</p>
            </div>
          }
        </div>
      :
        <p>404</p>
      }
      </div>
    );
  }
}

export default User;
