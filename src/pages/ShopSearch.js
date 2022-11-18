import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listAllProducts } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import CardLoading from '../components/cards/CardLoading';

const ShopSearch = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchAllProducts();
	}, []);

	const defaultCount = 6;
	const fetchAllProducts = () => {
		listAllProducts(defaultCount).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	};

	const ProductLists = () => {
		if (loading) {
			return <CardLoading count={defaultCount} />;
		} else {
			if (products.length < 1) {
				return <p>No products found</p>;
			} else {
				return (
					<div className='row pb-5'>
						{products.map((product) => (
							<div
								key={product._id}
								className='col-md-4 mt-3'>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				);
			}
		}
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-3'>Search/Filter Bar</div>
				<div className='col-md-9'>
					<ProductLists />
				</div>
			</div>
		</div>
	);
};

export default ShopSearch;
