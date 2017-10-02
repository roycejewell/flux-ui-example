import React, { Component } from 'react';
import { Link } from 'react-router';

import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            users: UserStore.getState().users,
            input: ''
        };
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
        UserActions.add(this.state.input);
        this.setState({
            input: ''
        });
    };

    render() {
        const { users, input } = this.state;
        return (
            <div>
                <input type='text' value={ input } onChange={ this.handleInputChange } />
                <button onClick={ this.addUser }>Add User</button>
                <ol>
                    {
                        users.map((user, i) => {
                            return (
                                <li key={ i }>
                                <Link to={`/user/${user}`}>{ user }</Link>
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default Home;
