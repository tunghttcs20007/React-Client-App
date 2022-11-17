import React, { Fragment, useState, useEffect } from 'react';
import { getLatestSortedProducts } from '../../functions/product';
import HomeProductCards from '../cards/HomeProductCards';
import CardLoading from '../cards/CardLoading';
import { Pagination } from 'antd';
import Ratings from '../../components/ratings/Ratings';

const pageSizeOptions = ['6', '12', '24'];

const BestSellersComp = ({ totaProducts }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(6);

	useEffect(() => {
		fetchAllProducts();
	}, [page, itemsPerPage]);

	const fetchAllProducts = () => {
		setLoading(true);
		getLatestSortedProducts('sold', 'desc', page, itemsPerPage).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	};

	const RenderProductCards = () =>
		products.map((product) => (
			<div
				key={product._id}
				className='col-md-4'>
				<Ratings product={product} />
				<HomeProductCards product={product} />
			</div>
		));

	return (
		<Fragment>
			<div>
				<h4
					id='new-arrivals'
					className='text-center p-4 mt-3 mb-4 display-3 jumbotron font-weight-bold'
					style={{
						color: '#e77f67',
						textShadow: '4px 4px #b2bec3',
						background: '#dff9fb',
					}}>
					Best Sellers
				</h4>
			</div>
			<div className='container'>
				{loading ? (
					<CardLoading count={products.length} />
				) : (
					<div className='row'>
						<RenderProductCards />
					</div>
				)}
			</div>
			<div className='row'>
				<nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
					<Pagination
						current={page}
						defaultPageSize={6}
						total={totaProducts}
						onChange={(value) => setPage(value)}
						pageSizeOptions={pageSizeOptions}
						showSizeChanger
						onShowSizeChange={(current, size) => {
							setItemsPerPage(size);
						}}
					/>
				</nav>
			</div>
		</Fragment>
	);
};

export default BestSellersComp;
