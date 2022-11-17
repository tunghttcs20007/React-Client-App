import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../functions/category';
import TextBanner from '../banner/TextBanner';

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getAllCategories().then((res) => {
			setCategories(res.data);
			setLoading(false);
		});
	}, []);

	const RenderCategory = () =>
		categories.map((category) => (
			<div
				key={category._id}
				className='col-sm-2 btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
				<Link to={`/category/${category.slug}`}>{category.name}</Link>
			</div>
		));

	return (
		<div>
			<TextBanner text='Categories' />
			<div className='container'>
				<div className='row'>
					{loading ? <h4 className='text-center'>Loading...</h4> : <RenderCategory />}
				</div>
			</div>
		</div>
	);
};

export default CategoryList;
