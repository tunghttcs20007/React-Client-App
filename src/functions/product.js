import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

const baseUrl = getBaseUrl('/product');

export const createProduct = async (product, accessToken) =>
	axios.post(baseUrl, product, {
		headers: {
			accessToken,
		},
	});

export const listAllProducts = async (count) =>
	axios.get(getBaseUrl(`/products/${count}`));

export const getProductInfo = async (slug) => axios.get(`${baseUrl}/${slug}`);

export const updateProduct = async (slug, product, accessToken) =>
	axios.put(`${baseUrl}/${slug}`, product, {
		headers: {
			accessToken,
		},
	});

export const removeProduct = async (slug, accessToken) =>
	axios.delete(`${baseUrl}/${slug}`, {
		headers: {
			accessToken,
		},
	});

export const getLatestSortedProducts = async (sort, order, page, limit) =>
	axios.post(getBaseUrl('/products'), { sort, order, page, limit });

export const getTotalProductsCount = async () => axios.get(getBaseUrl(`/products/total`));

export const updateProductRating = async (productId, rating, accessToken) =>
	axios.put(
		`${baseUrl}/rating/${productId}`,
		{ star: rating },
		{
			headers: {
				accessToken,
			},
		}
	);