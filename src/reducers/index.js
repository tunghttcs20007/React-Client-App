import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { payCodReducer } from './payCodReducer';
import { modalReducer } from './modalReducer';

const rootReducer = combineReducers({
	user: userReducer,
	search: searchReducer,
	cart: cartReducer,
	drawer: drawerReducer,
	coupon: couponReducer,
	payCOD: payCodReducer,
	modal: modalReducer,
});

export default rootReducer;
