import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import { getSubCategory, updateSubCategory } from '../../../functions/sub';
import { getAllCategories } from '../../../functions/category';
import InputForm from '../../../components/forms/InputForm';
import DropdownSelect from '../../../components/select/DropdownSelect';

const SubCategoryUpdate = ({ history, match }) => {
	const { slug } = match.params;

	const [subCategoryName, setSubCategoryName] = useState('');
	const [parentCategory, setParentCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	const { user: admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		fetchAllCategories();
		fetchSubCategory();
	}, []);

	const fetchAllCategories = () =>
		getAllCategories().then((res) => setCategories(res.data));

	const fetchSubCategory = () =>
		getSubCategory(slug).then((res) => {
			setSubCategoryName(res.data.name);
			setParentCategory(res.data.parentCategory);
		});

	/** Handle form submit to create category */
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(subCategoryName);
		updateSubCategory(slug, subCategoryName, parentCategory, admin.token)
			.then((res) => {
				setSubCategoryName('');
				toast.success(`Sub category "${res.data.name}" is updated!`);
				history.push('/admin/sub-category');
			})
			.catch((error) => {
				const status = error.response.status;
				const message = error.response.data;
				if (status === 400) {
					toast.error(message);
				}
				if (status === 409) {
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
					<h3 className='pt-2'>Update Sub Category</h3>
					<DropdownSelect
						clazzName='text-info font-weight-bold'
						items={categories}
						selectedItem={parentCategory}
						setValue={setParentCategory}
						label='Select Category'
						name='category'
					/>
					<InputForm
						handleSubmit={handleSubmit}
						value={subCategoryName}
						setValue={setSubCategoryName}
						isLoading={loading}
						btnName='Update'
						label='Sub Category Name'
						placeHolder='Enter new subcategory name'
					/>
				</div>
			</div>
		</div>
	);
};

export default SubCategoryUpdate;
