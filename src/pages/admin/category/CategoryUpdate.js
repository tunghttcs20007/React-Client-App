import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import { getCategory, updateCategory } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
	const slug = match.params.slug;
	const [categoryName, setCategoryName] = useState('');
	const [loading, setLoading] = useState(false);

	const { user: admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		fetchCategory();
	}, []);

	const fetchCategory = () =>
		getCategory(slug).then((res) => {
			setCategoryName(res.data.name);
			console.log(res.data);
		});

	/** Handle form submit to update category name */
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateCategory(slug, categoryName, admin.token)
			.then((res) => {
				setCategoryName('');
				toast.success(`"${res.data.name}" is updated!`);
				history.push('/admin/category');
			})
			.catch((error) => {
				const status = error.response.status;
				const message = error.response.data;
				if (status === 400) {
					toast.error(`${message}: ${categoryName}`);
				} else if (status === 404) {
					toast.error(message);
				}
			});
		setLoading(false);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h3 className='pt-2'>Update Category Name</h3>
					<CategoryForm
						handleSubmit={handleSubmit}
						value={categoryName}
						setValue={setCategoryName}
						isLoading={loading}
						type='Update'
						placeHolder='Enter new category name'
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
