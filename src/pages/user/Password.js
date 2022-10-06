import React, { useState } from 'react';
import UserNav from '../../components/navigation/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const promptErrorMsg = (errorCode) => {
		if (errorCode === 'auth/weak-password') {
			toast.error('Password should be at least 6 characters');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				setLoading(false);
				setPassword('');
				toast.success('Your password has successfully updated!');
			})
			.catch((error) => {
				setLoading(false);
				promptErrorMsg(error.code);
			});
	};

	const isPasswordValid = !password || password.length < 6;

	const updatePasswordForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label className='font-weight-bold'>Your Password</label>
				<input
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					className='form-control mt-1'
					placeholder='Enter new password'
					value={password}
					disabled={loading}
				/>
				<button
					className='btn btn-primary mt-2'
					disabled={isPasswordValid || loading}>
					Submit
				</button>
			</div>
		</form>
	);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				<div className='col'>
					{loading ? (
						<h3 className='text-info pt-1'>Loading</h3>
					) : (
						<h3 className='pt-1'>Password Update</h3>
					)}
					{updatePasswordForm()}
				</div>
			</div>
		</div>
	);
};

export default Password;
