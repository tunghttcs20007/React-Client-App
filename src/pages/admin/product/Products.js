import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import ProductCard from '../../../components/cards/ProductCard';
import { listAllProducts, removeProduct } from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { user: admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		fetchProducts(10);
	}, []);

	const fetchProducts = (count) => {
		setLoading(true);
		listAllProducts(count)
			.then((res) => {
				setLoading(false);
				setProducts(res.data);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const handleRemoveProduct = (slug) => {
		if (window.confirm('Are you sure to delete the selected product?')) {
			removeProduct(slug, admin.token)
				.then((res) => {
					console.log(res);
					fetchProducts(10);
					toast.success(`"${res.data.title}" is deleted!`, {
						position: 'top-center',
					});
				})
				.catch((error) => toast.error(error.response.data, { position: 'bottom-left' }));
		}
	};

	const ProductLists = () =>
		products.map((product) => (
			<div
				key={product._id}
				className='col-md-4 pb-2'>
				<ProductCard
					product={product}
					handleRemoveProduct={handleRemoveProduct}
				/>
			</div>
		));

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{loading ? (
						<h4 className='text-warning'>
							Loading <LoadingOutlined />
						</h4>
					) : (
						<h4>All Products</h4>
					)}
					<div className='row'>
						<ProductLists />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
