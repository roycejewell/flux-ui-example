import UserActions from 'actions/UserActions';
import { Alt, Storage } from 'utils';

@Storage
class UserStore {

	constructor() {
		this.users = this.get('users') || [];

		this.bindListeners({
			onAdd: UserActions.ADD,
			onUpdate: UserActions.UPDATE,
			onDelete: UserActions.DELETE,
		});
	}

	onAdd = (user) => {
		const users = [...this.users, user];
		this.users = users;
		this.set('users', users);
	};

	onUpdate = (user) => {
		let users = this.users;
		const userIndex = this.users.findIndex(u => u === user.from);
		users[userIndex] = user.to;
		this.set('users', users);
	}

	onDelete = (user) => {
		let users = this.users;
		const userIndex = this.users.findIndex(u => u === user);
		if (userIndex > -1) {
    	users.splice(userIndex, 1);
		}
		this.set('users', users);
	}
}

export default Alt.createStore(UserStore, 'UserStore');
