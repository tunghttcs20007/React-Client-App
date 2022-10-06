import { getBaseUrl } from '../utils/getBaseUrl';
import axios from 'axios';

export const getAllCategories = async () => axios.get(getBaseUrl('/get-categories'));

export const getCategory = async (slug) => axios.get(getBaseUrl(`/get-category/${slug}`));

export const deleteCategory = async (slug, accessToken) =>
	axios.delete(getBaseUrl(`/remove-category/${slug}`), {
		headers: {
			accessToken,
		},
	});

export const updateCategory = async (slug, categoryName, accessToken) =>
	axios.put(
		getBaseUrl(`/update-category/${slug}`),
		{ name: categoryName },
		{
			headers: {
				accessToken,
			},
		}
	);

export const createCategory = async (categoryName, accessToken) =>
	axios.post(
		getBaseUrl('/create-category'),
		{ name: categoryName },
		{
			headers: {
				accessToken,
			},
		}
	);
