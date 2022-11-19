import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';

const { Meta } = Card;

const ProductCard = ({ product }) => {
	const { title, description, images, slug, price } = product;

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
				<Fragment>
					<ShoppingCartOutlined className='text-success' />
					<br /> Add To Cart
				</Fragment>,
			]}>
			<Meta
				title={`${title} - $${price}`}
				description={`${description && description.substring(0, 24)}...`}
			/>
		</Card>
	);
};

export default ProductCard;
