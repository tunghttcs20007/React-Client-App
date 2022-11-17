import React, { Fragment } from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Laptop from '../../images/laptop.png';
import StarRatings from 'react-star-ratings';
import ProductDetailsList from './ProductDetailsList';
import RatingModal from '../modal/RatingModal';
import Ratings from '../../components/ratings/Ratings';

const { TabPane } = Tabs;

const ProductDetails = ({ product, userInfo, handleUserRating, star }) => {
	const { title, images, description, _id } = product;

	const ImagesCarousel = () => (
		<Carousel
			autoPlay
			infiniteLoop
			emulateTouch
			stopOnHover
			interval={4000}>
			{images && images.length ? (
				images &&
				images.map((image) => (
					<img
						src={image.url}
						key={image.public_id}
					/>
				))
			) : (
				<img
					src={Laptop}
					className='mb-3 default-img'
				/>
			)}
		</Carousel>
	);

	return (
		<Fragment>
			<div className='col-md-7'>
				<ImagesCarousel />
				<Tabs type='card'>
					<TabPane
						tab='Description'
						key='description'>
						{description}
					</TabPane>
					<TabPane
						tab='Specifications'
						key='specifications'>
						...
					</TabPane>
					<TabPane
						tab='More'
						key='more'>
						...
					</TabPane>
				</Tabs>
			</div>
			<div className='col-md-5'>
				<h2
					className='p-3 text-center'
					style={{
						background: 'linear-gradient(185deg, #4b4b4b 40%, #84817a 85%)',
						color: '#7efff5',
					}}>
					{title}
				</h2>
				<Ratings
					product={product}
					dimension={`35px`}
				/>
				<Card
					actions={[
						<Fragment>
							<ShoppingCartOutlined className='text-success' />
							<br />
							Add To Cart
						</Fragment>,
						<Link to='/'>
							<HeartOutlined className='text-info' />
							<br />
							Add To Wishlist
						</Link>,
						<RatingModal
							userInfo={userInfo}
							star={star}>
							<StarRatings
								name={_id}
								numberOfStars={5}
								rating={star}
								changeRating={handleUserRating}
								isSelectable={true}
								starRatedColor='#ff4757'
								starEmptyColor='#dfe4ea'
								starHoverColor='#ff4757'
							/>
						</RatingModal>,
					]}>
					<ProductDetailsList product={product} />
				</Card>
			</div>
		</Fragment>
	);
};

export default ProductDetails;
