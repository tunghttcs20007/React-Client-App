import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import _ from 'lodash';

const { Meta } = Card;

const ProductCard = ({ product }) => {
	const [tooltip, setTooltip] = useState('Click to add');

	const { title, description, images, slug, price } = product;

	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const handleClickAddToCard = () => {
		let cart = [];
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.getItem('cart'));
			cart.push({ ...product, count: 1 });
		}
		let unique = _.uniqWith(cart, _.isEqual);
		localStorage.setItem('cart', JSON.stringify(unique));
		//Add new item to cart state in redux
		dispatch({
			type: 'ADD_TO_CART',
			payload: unique,
		});
		//Update drawer state in redux to open side drawer
		if (tooltip === 'Added') {
			return;
		} else {
			dispatch({
				type: 'SET_VISIBILITY',
				payload: true,
			});
			setTooltip('Added');
		}
	};

	return (
		<Card
			hoverable
			cover={
				<img
					src={images && images.length ? images[0].url : laptop}
					style={{
						height: '180px',
						objectFit: 'cover',
					}}
					className='p-1'
				/>
			}
			actions={[
				<Link to={`/product/${slug}`}>
					<EyeOutlined className='text-warning' /> <br /> View Product
				</Link>,
				<Tooltip
					title={tooltip}
					color='cyan'>
					<a onClick={handleClickAddToCard}>
						<ShoppingCartOutlined className='text-success' />
						<br /> Add To Cart
					</a>
				</Tooltip>,
			]}>
			<Meta
				title={`${title} - $${price}`}
				description={`${description && description.substring(0, 24)}...`}
			/>
		</Card>
	);
};

export default ProductCard;
