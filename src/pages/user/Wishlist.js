import React, { useEffect, useState } from 'react';
import UserNav from '../../components/navigation/UserNav';
import { getUserWishlist, removeProductToWishList } from '../../functions/user';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));
	const history = useHistory();

	useEffect(() => {
		fetchUserWishlist();
	}, []);

	const fetchUserWishlist = () => {
		getUserWishlist(user.token).then((res) => {
			setWishlist(res.data.wishlist);
		});
	};

	const handleRemoveProduct = (productId, title) => {
		removeProductToWishList(user.token, productId).then((res) => {
			if (res.data.success) {
				toast.info(`Remove ${title} from your wishlist!`);
				fetchUserWishlist();
			}
		});
	};

	const WishListItem = () =>
		wishlist.map((product) => (
			<div
				key={product._id}
				className='alert alert-secondary'>
				<a
					className='text-info'
					onClick={() => history.push(`/product/${product.slug}`)}>
					{product.title}
				</a>
				<span>{` (Price: $${product.price})`}</span>
				<span
					className='float-right text-danger'
					style={{ cursor: 'pointer' }}
					onClick={() => handleRemoveProduct(product._id, product.title)}>
					<DeleteOutlined />
					&nbsp; Remove
				</span>
			</div>
		));

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				<div className='col'>
					<h4>Wishlist</h4>
					<WishListItem />
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
