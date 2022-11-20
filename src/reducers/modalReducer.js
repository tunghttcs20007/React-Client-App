export const modalReducer = (state = false, action) => {
	switch (action.type) {
		case 'SET_MODAL_VISIBILITY':
			return action.payload;
		default:
			return state;
	}
};
