import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import {
	createSubCategory,
	getAllSubCategories,
	deleteSubCategory,
} from '../../../functions/sub';
import { getAllCategories } from '../../../functions/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import SearchForm from '../../../components/forms/SearchForm';
import SelectOption from '../../../components/options/SelectOption';

const SubCategoryCreate = () => {
	const [subCategoryName, setSubCategoryName] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [searchKey, setSearchKey] = useState('');

	const { user: admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		fetchAllCategories();
		fetchAllSubCategories();
	}, []);

	const fetchAllCategories = () =>
		getAllCategories().then((res) => setCategories(res.data));

	const fetchAllSubCategories = () =>
		getAllSubCategories().then((res) => setSubCategories(res.data));

	/** Handle delete category */
	const clickDeleteHandler = (slug) => {
		const isDeleteConfirm = window.confirm('Are you sure to delete item?');
		setLoading(true);
		if (isDeleteConfirm) {
			deleteSubCategory(slug, admin.token)
				.then((res) => {
					toast.warning(`Sub category ${slug.toUpperCase()} is deleted!`);
					fetchAllSubCategories();
				})
				.catch((error) => {
					const status = error.response.status;
					const message = error.response.data;
					if (status === 400) {
						toast.error(`${message}: ${subCategoryName}`);
					} else if (status === 404) {
						toast.error(message);
					}
				});
		}
		setLoading(false);
	};

	/** Handle search */
	const searchCategory = (keyword) => (category) =>
		category.name.toLowerCase().includes(keyword);

	const showSubCategories = () => {
		if (subCategories) {
			return subCategories.filter(searchCategory(searchKey.toLowerCase())).map((sub) => (
				<div
					key={sub._id}
					className='alert alert-secondary mt-1'>
					{sub.name}{' '}
					<span
						className='btn btn-sm float-right text-danger'
						onClick={() => clickDeleteHandler(sub.slug)}>
						<DeleteOutlined />
					</span>
					<Link to={`/admin/sub-category-update/${sub.slug}`}>
						<span className='btn btn-sm float-right text-info'>
							<EditOutlined />
						</span>
					</Link>
				</div>
			));
		}
	};

	/** Handle form submit to create category */
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(subCategoryName);
		createSubCategory(subCategoryName, categoryId, admin.token)
			.then((res) => {
				setSubCategoryName('');
				toast.success(`"${res.data.name}" is created!`);
				fetchAllSubCategories();
			})
			.catch((error) => toast.error(error.response.data));
		setLoading(false);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h3 className='pt-2'>Create Sub Category</h3>
					<SelectOption
						items={categories}
						setValue={setCategoryId}
						label='Select Category'
						name='category'
						defaultOption='Please Select root category'
					/>
					<CategoryForm
						handleSubmit={handleSubmit}
						value={subCategoryName}
						setValue={setSubCategoryName}
						isLoading={loading}
						type='Create'
						label='Sub Category Name'
						placeHolder='Enter sub category name'
					/>
					<SearchForm
						searchKey={searchKey}
						setSearchKey={setSearchKey}
						placeHolder='Search'
						type='search'
					/>
					{showSubCategories()}
				</div>
			</div>
		</div>
	);
};

export default SubCategoryCreate;
