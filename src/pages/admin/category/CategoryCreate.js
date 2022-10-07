import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navigation/AdminNav';
import {
	createCategory,
	getAllCategories,
	deleteCategory,
} from '../../../functions/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import InputForm from '../../../components/forms/InputForm';
import SearchForm from '../../../components/forms/SearchForm';

const CategoryCreate = () => {
	const [categoryName, setCategoryName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [searchKey, setSearchKey] = useState('');

	const { user: admin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		fetchAllCategories();
	}, []);

	const fetchAllCategories = () =>
		getAllCategories().then((res) => setCategories(res.data));

	/** Handle delete category */
	const clickDeleteHandler = (slug) => {
		const isDeleteConfirm = window.confirm('Are you sure to delete item?');
		setLoading(true);
		if (isDeleteConfirm) {
			deleteCategory(slug, admin.token)
				.then((res) => {
					console.log(res);
					fetchAllCategories();
					toast.warning(`${slug.toUpperCase()} is deleted!`);
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
		}
		setLoading(false);
	};

	/** Handle search */
	const searchCategory = (keyword) => (category) =>
		category.name.toLowerCase().includes(keyword);

	const showCategories = () => {
		if (categories) {
			return categories
				.filter(searchCategory(searchKey.toLowerCase()))
				.map((category) => (
					<div
						key={category._id}
						className='alert alert-secondary mt-1'>
						{category.name}{' '}
						<span
							className='btn btn-sm float-right text-danger'
							onClick={() => clickDeleteHandler(category.slug)}>
							<DeleteOutlined />
						</span>
						<Link to={`/admin/category-update/${category.slug}`}>
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
		createCategory(categoryName, admin.token)
			.then((res) => {
				setCategoryName('');
				toast.success(`"${res.data.name}" is created!`);
				fetchAllCategories();
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
					<h3 className='pt-2'>Create Category</h3>
					<InputForm
						handleSubmit={handleSubmit}
						value={categoryName}
						setValue={setCategoryName}
						isLoading={loading}
						btnName='Create'
						label='Category Name'
						placeHolder='Enter category name'
					/>
					<SearchForm
						searchKey={searchKey}
						setSearchKey={setSearchKey}
						placeHolder='Search'
						type='search'
					/>
					<hr />
					<div
						className='pt-1'
						style={{ height: '500px', overflow: 'scroll' }}>
						{showCategories()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
