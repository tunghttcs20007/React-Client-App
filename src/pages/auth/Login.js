import React, { useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { LoginButton } from '../../components/login/LoginButton';
import { GoogleLoginButton } from '../../components/login/GoogleLoginButton';
import { useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

const Login = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		// console.log(email, password);
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			// console.log(result);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();

			dispatch({
				type: 'LOGGED_IN_USER',
				payload: {
					email: user.email,
					token: idTokenResult.token,
				},
			});
			history.push('/');
			toast.success('Login Successfully!');
		} catch (error) {
			console.log(error);
			let errorCode = error.code;
			if (errorCode === 'auth/invalid-email') {
				toast.error('Your email format is not right!');
			}
			if (errorCode === 'auth/wrong-password') {
				toast.error('Your credential is incorrect!');
			}
			if (errorCode === 'auth/user-not-found') {
				toast.error('You have not registered yet!');
			}
			setIsLoading(false);
		}
	};

	const googleLogin = async () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: {
						email: user.email,
						token: idTokenResult.token,
					},
				});
				history.push('/');
			})
			.catch((error) => {
				console.log(error);
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
			<LoginButton email={email} password={password} handleSubmit={handleSubmit} />
			<GoogleLoginButton loginWithGoogle={googleLogin} />
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
