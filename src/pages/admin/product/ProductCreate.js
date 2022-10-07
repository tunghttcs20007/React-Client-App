import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { createProduct } from '../../../functions/product';
import { getAllCategories, getSubsByParent } from '../../../functions/category';

const initialValue = {
	title: 'Laptop',
	description: 'This is the best product...',
	price: '100',
	category: '',
	subCategory: [],
	shipping: 'Yes',
	quantity: '50',
	images: [],
	color: '',
	brand: '',
};

const resetElemsValue = (locator, value) => {
	Array.from(document.querySelectorAll(locator)).forEach(
		(elem) => (elem.value = value ? value : '')
	);
};

const ProductCreate = () => {
	const [product, setProduct] = useState(initialValue);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [showSubsOption, setShowSubsOption] = useState(false);

	const { user: Admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		getAllCategories().then((res) => setCategories(res.data));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct({ ...product }, Admin.token)
			.then((res) => {
				toast.success(`"${res.data.title}" is created!`, { position: 'top-center' });
				resetElemsValue('input');
				resetElemsValue('select', 'default');
				setProduct(initialValue);
			})
			.catch((error) => toast.error(error.response.data, { position: 'bottom-left' }));
	};

	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const getSubsOnCategoryChange = (e) => {
		e.preventDefault();
		setProduct({ ...product, subCategory: [], category: e.target.value });
		getSubsByParent(e.target.value, setSubCategories);
		setShowSubsOption(true);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					<h4>Create Product</h4>
					<hr />
					<ProductCreateForm
						submitHandler={handleSubmit}
						onChangeHandler={handleChange}
						values={product}
						categories={categories}
						subCategories={subCategories}
						setValues={setProduct}
						showSubCategory={showSubsOption}
						onCategoryChange={getSubsOnCategoryChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;
