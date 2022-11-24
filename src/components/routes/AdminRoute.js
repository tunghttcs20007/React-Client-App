import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingForRedirect from './LoadingForRedirect';
import { getCurrentAdmin } from '../../services/auth';

/** Private admin route - only display the page when the admin already login and validate */
const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [isAdmin, setIsAdmin] = useState(false);

	let isUserLogin = user && user.token ? true : false;

	useEffect(() => {
		if (isUserLogin) {
			getCurrentAdmin(user.token)
				.then((res) => {
					setIsAdmin(true);
				})
				.catch((error) => {
					console.log(error);
					setIsAdmin(false);
				});
		}
	}, [user, isUserLogin]);

	const renderUserRoute = isAdmin ? <Route {...rest}></Route> : <LoadingForRedirect />;

	return renderUserRoute;
};

export default AdminRoute;
