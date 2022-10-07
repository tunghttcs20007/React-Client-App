import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { LoginButton } from '../../components/login/LoginButton';
import { GoogleLoginButton } from '../../components/login/GoogleLoginButton';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';


const Login = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user, history]);

	const roleBasedRedirect = (res) => {
		if (res.data.role === 'admin') {
			history.push('/admin/dashboard');
		} else {
			history.push('/user/history');
		}
	};

	const promptErrorMsg = (errorCode) => {
		if (errorCode === 'auth/invalid-email') {
			toast.error('Your email format is not right!');
		}
		if (errorCode === 'auth/wrong-password') {
			toast.error('Your credential is incorrect!');
		}
		if (errorCode === 'auth/user-not-found') {
			toast.error('You have not registered yet!');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();

			/** Update login state to DB then dispatch from DB */
			createOrUpdateUser(idTokenResult.token)
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
					roleBasedRedirect(res);
					toast.success('Login Successfully!');
				})
				.catch((error) => console.error(error.message));
		} catch (error) {
			promptErrorMsg(error.code);
			setIsLoading(false);
		}
	};

	const googleLogin = async () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				createOrUpdateUser(idTokenResult.token)
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
						roleBasedRedirect(res);
						toast.success('Login Successfully!');
					})
					.catch((error) => console.error(error.message));
			})
			.catch((error) => {
				toast.error(error.code);
			});
	};

	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<input
					type='email'
					className='form-control'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Please enter your email'
					autoFocus
				/>
			</div>
			<div className='form-group'>
				<input
					type='password'
					className='form-control'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Please enter your password'
				/>
			</div>
			<LoginButton
				email={email}
				password={password}
				handleSubmit={handleSubmit}
			/>
			<GoogleLoginButton loginWithGoogle={googleLogin} />
			<Link
				to='/forgot/password'
				className='float-right text-danger'>
				Forgot Password?
			</Link>
		</form>
	);

	return (
		<div className='containter p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					{!isLoading ? (
						<h4>Login</h4>
					) : (
						<h5 className='text-info'>
							Logging in
							<LoadingOutlined className='ml-2' />
						</h5>
					)}
					{loginForm()}
				</div>
			</div>
		</div>
	);
};

export default Login;
