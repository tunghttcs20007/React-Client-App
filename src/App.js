import React, { useEffect, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import SideDrawer from './components/drawer/SideDrawer';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/navigation/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCategoryCreate from './pages/admin/sub/SubCategoryCreate';
import SubCategoryUpdate from './pages/admin/sub/SubCategoryUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import Products from './pages/admin/product/Products';
import ProductDetails from './pages/admin/product/ProductDetails';
import SingleProduct from './pages/SingleProduct';
import CategoryPage from './pages/category/CategoryPage';
import SubCategoryPage from './pages/sub-category/SubCategoryPage';
import ShopSearch from './pages/ShopSearch';
import CartPage from './pages/cart/CartPage';
import CheckOut from './pages/payment/CheckOut';
import CreateCoupon from './pages/admin/coupon/CreateCoupon';
import Payment from './pages/payment/Payment';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './functions/auth';

const App = () => {
	const dispatch = useDispatch();

	// to check firebase auth state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				getCurrentUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						});
					})
					.catch((error) => console.error(error.message));
			}
		});
		// cleanup
		return () => unsubscribe();
	}, [dispatch]);

	return (
		<Fragment>
			<Header />
			<SideDrawer />
			<ToastContainer />
			<Switch>
				<Route
					exact
					path='/'
					component={Home}
				/>
				<Route
					exact
					path='/login'
					component={Login}
				/>
				<Route
					exact
					path='/register'
					component={Register}
				/>
				<Route
					exact
					path='/register/complete'
					component={RegisterComplete}
				/>
				<Route
					exact
					path='/forgot/password'
					component={ForgotPassword}
				/>
				<Route
					exact
					path='/product/:slug'
					component={SingleProduct}
				/>
				<Route
					exact
					path='/category/:slug'
					component={CategoryPage}
				/>
				<Route
					exact
					path='/sub-category/:slug'
					component={SubCategoryPage}
				/>
				<Route
					exact
					path={['/shop', '/shop/search']}
					component={ShopSearch}
				/>
				<Route
					exact
					path='/cart'
					component={CartPage}
				/>
				(/** Protect User Route */)
				<UserRoute
					exact
					path='/user/history'
					component={History}
				/>
				<UserRoute
					exact
					path='/user/password'
					component={Password}
				/>
				<UserRoute
					exact
					path='/user/wishlist'
					component={Wishlist}
				/>
				<UserRoute
					exact
					path='/user/checkout'
					component={CheckOut}
				/>
				<UserRoute
					exact
					path='/user/payment'
					component={Payment}
				/>
				(/** Protect Admin Route */)
				<AdminRoute
					exact
					path='/admin/dashboard'
					component={AdminDashboard}
				/>
				<AdminRoute
					exact
					path='/admin/category'
					component={CategoryCreate}
				/>
				<AdminRoute
					exact
					path='/admin/category-update/:slug'
					component={CategoryUpdate}
				/>
				<AdminRoute
					exact
					path='/admin/sub-category'
					component={SubCategoryCreate}
				/>
				<AdminRoute
					exact
					path='/admin/sub-category-update/:slug'
					component={SubCategoryUpdate}
				/>
				<AdminRoute
					exact
					path='/admin/create-product'
					component={ProductCreate}
				/>
				<AdminRoute
					exact
					path='/admin/products'
					component={Products}
				/>
				<AdminRoute
					exact
					path='/admin/product/:slug'
					component={ProductDetails}
				/>
				<AdminRoute
					exact
					path='/admin/coupon'
					component={CreateCoupon}
				/>
				<AdminRoute
					exact
					path='/user/payment'
					component={Payment}
				/>
			</Switch>
		</Fragment>
	);
};

export default App;
