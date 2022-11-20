import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserCart, emptyUserCart, updateUserAddress, applyCoupon } from '../../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const initialState = {
	products: [],
	total: 0,
	totalAfterDiscount: 0,
	discount: 0,
	discountErr: '',
};

const CheckOut = ({ history }) => {
	const [cartInfo, setCartInfo] = useState(initialState);
	const [userAddress, setUserAddress] = useState('');
	const [isUserAddSave, setIsUserAddSave] = useState(false);
	const [couponName, setCouponName] = useState('');

	const { user, coupon } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		getUserCart(user.token).then((res) => {
			setCartInfo({ products: res.data.products, total: res.data.cartTotal });
		});
	}, []);

	const showOrderedProducts = () => {
		const { products } = cartInfo;
		if (products) {
			return products.map((obj, index) => (
				<Fragment key={`${index}-${obj._id}`}>
					<div
						key={`${index}-${obj._id}`}
						className='col'>
						<p className='row'>
							<span
								className='text-primary'
								style={{ fontWeight: 'bold' }}>{`${obj.product.title}: `}</span>
							{obj.count} item(s)
						</p>
						<p className='row'>
							Color:&nbsp;
							<span style={{ color: `${obj.color === 'White' ? 'Grey' : obj.color}` }}>
								{obj.color}&nbsp;
							</span>
							|&nbsp;Total: ${obj.product.price * obj.count}
						</p>
					</div>
				</Fragment>
			));
		}
	};

	const handleClickSave = () => {
		updateUserAddress(userAddress, user.token).then((res) => {
			if (res.data.success) {
				toast.success('Your address is saved!');
				setIsUserAddSave(true);
			}
		});
	};

	const handleClickEmptyCart = () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('cart');
		}
		dispatch({
			type: 'ADD_TO_CART',
			payload: [],
		});
		emptyUserCart(user.token).then((res) => {
			setCartInfo(initialState);
			toast.info('Cart is cleared. Please continue your shopping!');
		});
	};

	const handleClickApply = () => {
		applyCoupon(couponName, user.token).then((res) => {
			const { data } = res;
			if (data.error) {
				setCartInfo({ ...cartInfo, discountErr: data.error });
				toast.error(data.error);
				//TODO: update coupon apply in redux
				dispatch({ type: 'COUPON_APPLIED', payload: false });
			}
			if (data.success) {
				setCartInfo({
					...cartInfo,
					totalAfterDiscount: data.discountPrice,
					discount: data.discount,
				});
				//TODO: update totalAfterDiscount in redux
				dispatch({ type: 'COUPON_APPLIED', payload: true });
			}
		});
	};

	const handClickPlaceOrder = () => {
		history.push('/user/payment');
	};

	const ShowTextArea = useMemo(() => {
		return (
			<Fragment>
				<ReactQuill
					defaultValue={userAddress}
					placeholder='Type your address...'
					theme='snow'
					onChange={setUserAddress}
					style={{ height: '120px' }}
				/>
				<br />
				<br />
				<button
					className='btn btn-outline-primary mt-2 float-right'
					onClick={handleClickSave}>
					Save
				</button>
				<br />
			</Fragment>
		);
	}, [userAddress]);

	const ShowApplyCoupon = useMemo(() => {
		return (
			<Fragment>
				<input
					type='text'
					value={couponName}
					className='form-control'
					onChange={(e) => {
						setCouponName(e.target.value);
					}}
				/>
				<button
					className='btn btn-outline-primary mt-2 float-right'
					onClick={handleClickApply}>
					Apply
				</button>
			</Fragment>
		);
	}, [couponName]);

	return (
		<div className='row pt-2 pl-4 pr-4'>
			<div className='col-md-6'>
				<h4>Delivery Details</h4>
				{ShowTextArea}
				<h5 className='pt-4'>Apply Coupon</h5>
				{ShowApplyCoupon}
			</div>
			<div className='col-md-6'>
				<h4>Order Summary</h4>
				<p>Total Products: {cartInfo.products.length}</p>
				<hr />
				{showOrderedProducts()}
				<hr />
				<p>Cart Total: ${cartInfo.total}</p>
				{cartInfo.totalAfterDiscount > 0 && (
					<p className='text-light text-center bg-success pt-2 pb-2'>
						Discount Total: ${cartInfo.totalAfterDiscount} <br />
						Coupon ${cartInfo.discount}% discount is applied
					</p>
				)}
				<div className='col'>
					<div className='row'>
						<button
							disabled={!isUserAddSave || !cartInfo.products.length}
							className='btn btn-success btn-raised'
							onClick={handClickPlaceOrder}>
							Place Order
						</button>
					</div>
					<div className='row pt-2'>
						<button
							disabled={!cartInfo.products.length}
							onClick={handleClickEmptyCart}
							className='btn btn-outline-danger'>
							Empty Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckOut;
