import { Alt } from 'utils';

class UsersActions {

	add(user) {
		return user;
	}

	delete(user) {
		return user;
	}

	update(from, to) {
		return {
			from,
			to
		}
	}
}

export default Alt.createActions(UsersActions);
