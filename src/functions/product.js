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

export const getProduct = async (slug) => axios.get(`${baseUrl}/${slug}`);

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