import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import HomeProductCards from '../../../components/cards/AdminProductCard';
import { getAllProducts, removeProduct } from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { user: admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		setLoading(true);
		fetchProducts();
	}, []);

	const fetchProducts = () => {
		getAllProducts()
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
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
					fetchProducts();
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
				<HomeProductCards
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
