export const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGGED_IN_USER':
			let { address, email, name, role } = action.payload;
			localStorage.setItem('userInfo', JSON.stringify({ address, email, name, role }));
			return action.payload;
		case 'LOGOUT':
			return action.payload;
		default:
			return state;
	}
};
