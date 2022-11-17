import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductInfo, updateProductRating } from '../functions/product';
import ProductDetails from '../components/cards/ProductDetails';

const SingleProduct = ({ match }) => {
	const [product, setProduct] = useState({});
	const [userRating, setUserRating] = useState(0);

	const { user } = useSelector((state) => ({ ...state }));

	const { slug } = match.params;

	useEffect(() => {
		loadProductDetails();
	}, [slug]);

	useEffect(() => {
		if (product.ratings && product.ratings.star && user) {
			let currentUserRating = product.ratings.find(
				(elem) => elem.postedBy.toString() === user._id.toString()
			);
			setUserRating(currentUserRating.star);
		}
	}, [product, user]);

	const handleUserRating = (newRating, name) => {
		setUserRating(newRating);
		updateProductRating(name, newRating, user.token).then((res) => {
			toast.success('Thank you for your rating. Please continue visit our shop!!!');
			loadProductDetails(); //To show updated rating in real time
		});
	};

	const loadProductDetails = () => getProductInfo(slug).then((res) => setProduct(res.data));

	return (
		<div className='container-fluid'>
			<div className='row pt-4'>
				<ProductDetails
					product={product}
					userInfo={user}
					handleUserRating={handleUserRating}
					star={userRating}
				/>
			</div>
			<div className='row p-5'>
				<div className='col text-center pt-5 pb-5'>
					<hr />
					<h3>Related Products</h3>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default SingleProduct;
