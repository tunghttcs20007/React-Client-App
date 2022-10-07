import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

const baseUrl = getBaseUrl('/sub-category');

export const getAllSubCategories = async () => axios.get(getBaseUrl('/sub-categories'));

export const getSubCategory = async (slug) => axios.get(`${baseUrl}/${slug}`);

export const deleteSubCategory = async (slug, accessToken) =>
	axios.delete(`${baseUrl}/${slug}`, {
		headers: {
			accessToken,
		},
	});

export const updateSubCategory = async (slug, subName, parent, accessToken) =>
	axios.put(
		`${baseUrl}/${slug}`,
		{ name: subName, categoryId: parent },
		{
			headers: {
				accessToken,
			},
		}
	);

export const createSubCategory = async (subName, categoryId, accessToken) =>
	axios.post(
		baseUrl,
		{ name: subName, categoryId },
		{
			headers: {
				accessToken,
			},
		}
	);
