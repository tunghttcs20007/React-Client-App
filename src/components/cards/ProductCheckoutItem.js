import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { CheckCircleFilled, CloseCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { toast } from 'react-toastify';
import Laptop from '../../images/laptop.png';
import { COLOR as OPTIONS } from '../../static/Data';

const ProductCheckoutItem = ({ product }) => {
	const [visible, setVisible] = useState(false);

	const { title, price, color, count, shipping, images, quantity, sold } = product;

	const dispatch = useDispatch();

	const showImage = (url, alt) => (
		<Fragment>
			<Image
				preview={{ visible: false }}
				width={240}
				src={url}
				onClick={() => setVisible(true)}
			/>
			<div style={{ display: 'none' }}>
				<Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
					{images.length ? (
						images.map((img, index) => (
							<Image
								key={index}
								src={img.url}
							/>
						))
					) : (
						<Image src={Laptop} />
					)}
				</Image.PreviewGroup>
			</div>
		</Fragment>
	);

	let url = images.length ? images[0].url : Laptop;

	const renderSelectOptions = (options, data, handleDataChange) => {
		return (
			<select
				className='form-control text-center'
				name='data'
				id={`data-${data}`}
				onChange={handleDataChange}>
				{data ? (
					<option
						value={data}
						key={data}>
						{data}
					</option>
				) : (
					<option>Select</option>
				)}
				{options
					.filter((option) => option !== data)
					.map((data) => (
						<option
							key={data}
							value={data}>
							{data}
						</option>
					))}
			</select>
		);
	};

	const handleColorChange = (e) => {
		let cart = [];
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((item, index) => {
				if (item._id === product._id) {
					cart[index].color = e.target.value;
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart,
			});
		}
	};

	const handleQuantityChange = (e) => {
		let cart = [];
		let currentQuantity = e.target.value < 1 ? 1 : e.target.value;

		if (currentQuantity > quantity) {
			toast.warning(`Only in-stock ${quantity} ${title.toUpperCase()} product(s)`, {
				pauseOnFocusLoss: false,
				position: 'top-center',
				style: {},
			});
			return;
		}

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((item, index) => {
				if (item._id === product._id) {
					cart[index].count = currentQuantity;
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart,
			});
		}
	};

	const handleRemoveItem = (e) => {
		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((item, index) => {
				if (item._id === product._id) {
					cart.splice(index, 1);
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart,
			});
		}
	};

	return (
		<tbody>
			<tr className='text-center cart-items'>
				<td>{showImage(url, title)}</td>
				<td>{title}</td>
				<td>${price}</td>
				<td>{renderSelectOptions(OPTIONS, color, handleColorChange)}</td>
				<td className='shipping-status'>
					{shipping === 'Yes' ? (
						<CheckCircleFilled className='text-success' />
					) : (
						<CloseCircleFilled className='text-danger' />
					)}
				</td>
				<td className='product-quantity'>
					<input
						className='quantity'
						name='quantity'
						value={count}
						type='number'
						onChange={handleQuantityChange}
					/>
				</td>
				<td className='text-warning'>
					<DeleteOutlined
						className='pointer'
						onClick={handleRemoveItem}
					/>
				</td>
			</tr>
		</tbody>
	);
};

export default ProductCheckoutItem;
