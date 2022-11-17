import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

const baseUrl = getBaseUrl('/category');

export const getAllCategories = async () => axios.get(getBaseUrl('/categories'));

export const getCategory = async (slug) => axios.get(`${baseUrl}/${slug}`);

export const deleteCategory = async (slug, accessToken) =>
	axios.delete(`${baseUrl}/${slug}`, {
		headers: {
			accessToken,
		},
	});

export const updateCategory = async (slug, categoryName, accessToken) =>
	axios.put(
		`${baseUrl}/${slug}`,
		{ name: categoryName },
		{
			headers: {
				accessToken,
			},
		}
	);

export const createCategory = async (categoryName, accessToken) =>
	axios.post(
		baseUrl,
		{ name: categoryName },
		{
			headers: {
				accessToken,
			},
		}
	);

export const getSubsByParent = async (id, setData) => {
	axios
		.get(getBaseUrl(`/category/sub-catogories/${id}`))
		.then((res) => setData(res.data));
};

export const getProductByCategory = async (id) => axios.get(`${baseUrl}/products/${id}`);
