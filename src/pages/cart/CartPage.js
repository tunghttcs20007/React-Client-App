import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCheckoutItem from '../../components/cards/ProductCheckoutItem';
import { userCheckout } from '../../functions/user';
import { toast } from 'react-toastify';

const CartPage = ({ history }) => {
	const { cart, user } = useSelector((state) => ({ ...state }));

	const renderProductTable = () => (
		<table className='table table-bordered'>
			<thead className='thead-light'>
				<tr className='text-center'>
					<th scope='col'>Image</th>
					<th scope='col'>Title</th>
					<th scope='col'>Price</th>
					<th scope='col'>Color</th>
					<th scope='col'>Shipping</th>
					<th scope='col'>Quantity</th>
					<th scope='col'></th>
				</tr>
			</thead>

			{cart.map((product) => (
				<ProductCheckoutItem
					product={product}
					key={product._id}
				/>
			))}
		</table>
	);

	const renderCartInfo = () => {
		if (cart.length < 1) {
			return (
				<p>
					No product added. <Link to='/shop'>Continue shopping</Link>
				</p>
			);
		} else {
			return <Fragment>{renderProductTable()}</Fragment>;
		}
	};

	const getTotalPrice = () => {
		return cart.reduce((currentVal, nextVal) => {
			return currentVal + nextVal.count * nextVal.price;
		}, 0);
	};

	const clickProceedPayment = () => {
		//TODO: handle user checkout
		userCheckout(cart, user.token)
			.then((res) => {
				if (res.data.success) {
					history.push('/user/checkout');
				}
			})
			.catch((error) => {
				const response = error.response;
				if (response.status === 401) {
					toast.error('Your session is expired. Please re-login to proceed to checkout!', {
						position: 'top-center',
					});
				}
			});
	};

	const renderOrderDetails = () => {
		if (cart.length && cart.length > 0) {
			return (
				<Fragment>
					{cart.map((product, index) => (
						<div key={index}>
							<p>
								{product.count} x {product.title} (${product.price * product.count})
							</p>
						</div>
					))}
					<hr />
					<b>${getTotalPrice()}</b>
					<hr />
					{user ? (
						<button
							onClick={clickProceedPayment}
							className='btn btn-sm btn-outline-success'
							disabled={!cart.length}>
							Proceed payment
						</button>
					) : (
						<button className='btn btn-sm btn-outline-info'>
							<Link to={{ pathname: '/login', state: { from: 'cart' } }}>Login to checkout</Link>
						</button>
					)}
				</Fragment>
			);
		}
	};

	return (
		<div className='container-fluid pt-2'>
			<div className='row'>
				<div className='col-md-8'>
					<h4>{cart.length} item(s) in your cart</h4>
					{renderCartInfo()}
				</div>
				<div className='col-md-4'>
					<h4>Order Summary</h4>
					<hr />
					<h6>Selected Products</h6>
					{renderOrderDetails()}
				</div>
			</div>
		</div>
	);
};

export default CartPage;
