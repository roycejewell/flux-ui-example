import { Alt } from 'utils';

class UsersActions {

	add(name) {
		return name;
	}

	delete(name) {
		return name;
	}

	update(from, to) {
		return {
			from,
			to
		}
	}

	clear() {
		return null;
	}

}

export default Alt.createActions(UsersActions);
