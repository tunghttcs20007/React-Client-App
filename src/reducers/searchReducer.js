export const searchReducer = (state = { text: '' }, action) => {
	switch (action.type) {
		case 'SEARCH_TEXT':
			return { ...state, ...action.pay };
		default:
			return state;
	}
};
