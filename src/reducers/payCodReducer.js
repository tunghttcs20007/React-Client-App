export const payCodReducer = (state = false, action) => {
	switch (action.type) {
		case 'PAY_COD':
			return action.payload;
		default:
			return state;
	}
};
