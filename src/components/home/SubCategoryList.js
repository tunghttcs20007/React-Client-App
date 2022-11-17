import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllSubCategories } from '../../functions/sub';
import TextBanner from '../banner/TextBanner';

const SubCategoryList = () => {
	const [subCategories, setSubCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getAllSubCategories().then((res) => {
			setSubCategories(res.data);
			setLoading(false);
		});
	}, []);

	const RenderSubCategories = () =>
		subCategories.map((sub) => (
			<div
				key={sub._id}
				className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
				<Link to={`/sub-category/${sub.slug}`}>{sub.name}</Link>
			</div>
		));

	return (
		<div>
			<TextBanner text='Categories' />
			<div className='container'>
				<div className='row'>
					{loading ? <h4 className='text-center'>Loading...</h4> : <RenderSubCategories />}
				</div>
			</div>
		</div>
	);
};

export default SubCategoryList;
