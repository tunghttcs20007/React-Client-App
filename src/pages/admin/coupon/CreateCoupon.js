import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getAllCoupons, removeCoupon, createCoupon } from '../../../services/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/navigation/AdminNav';
import NotificationModal from '../../../components/modal/NotificationModal';

const initialState = {
	name: '',
	discount: '',
	expiry: new Date(),
};

const CreateCoupon = () => {
	const [counponState, setCouponState] = useState(initialState);
	const [loading, setLoading] = useState('');
	const [coupons, setCoupons] = useState([]);
	const [removeCouponId, setRemoveCouponId] = useState('');
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		loadAllCoupons();
	}, []);

	const loadAllCoupons = () => getAllCoupons().then((res) => setCoupons(res.data));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCoupon({ ...counponState }, user.token).then((res) => {
			if (res.data.errors) {
				toast.error(res.data.message);
				return;
			}
			setLoading(false);
			loadAllCoupons(); // load all coupons
			setCouponState(initialState);
			toast.success(`COUPON (${res.data.coupon.name}) is created`);
		});
	};

	const handleOpenModalOnDeleteCoupon = (id) => {
		setRemoveCouponId(id);
		dispatch({ type: 'SET_MODAL_VISIBILITY', payload: true });
	};

	const handleRemove = (couponId) => {
		if (removeCoupon) {
			setLoading(true);
			removeCoupon(user.token, couponId)
				.then((res) => {
					loadAllCoupons(); // load all coupons
					setLoading(false);
					toast.info(`Coupon is deleted`);
				})
				.catch((error) => console.log(error));
		}
	};

	const showCounponsList = () => {
		if (coupons) {
			return coupons.map((coupon) => (
				<tr key={coupon._id}>
					<td>{coupon.name}</td>
					<td>{new Date(coupon.expiry).toLocaleDateString()}</td>
					<td>{coupon.discount}%</td>
					<td>
						<DeleteOutlined
							onClick={() => handleOpenModalOnDeleteCoupon(coupon._id)}
							className='text-danger pointer'
						/>
					</td>
				</tr>
			));
		}
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					{loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Coupon</h4>}
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label className='text-muted'>Name</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setCouponState({ ...counponState, name: e.target.value })}
								value={counponState.name}
								autoFocus
								required
							/>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Discount %</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setCouponState({ ...counponState, discount: e.target.value })}
								value={counponState.discount}
								required
							/>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Expiry</label>
							<br />
							<DatePicker
								className='form-control'
								selected={counponState.expiry}
								value={counponState.expiry}
								onChange={(date) => setCouponState({ ...counponState, expiry: date })}
								required
							/>
						</div>
						<button className='btn btn-outline-primary'>Save</button>
					</form>
					<br />
					<h4>{coupons.length} Coupons</h4>
					<table className='table table-bordered'>
						<thead className='thead-light'>
							<tr>
								<th scope='col'>Name</th>
								<th scope='col'>Expiry</th>
								<th scope='col'>Discount</th>
								<th scope='col'>Action</th>
							</tr>
						</thead>
						<tbody>{showCounponsList()}</tbody>
					</table>
				</div>
			</div>
			<NotificationModal
				title={'Remove Coupon'}
				message={'Are you sure to delete this coupon?'}
				handleClickYes={() => {
					handleRemove(removeCouponId);
					dispatch({ type: 'SET_MODAL_VISIBILITY', payload: false });
				}}
			/>
		</div>
	);
};

export default CreateCoupon;
