import { getBaseUrl } from '../utils/getBaseUrl';
import axios from 'axios';

export const getAllSubCategories = async () => axios.get(getBaseUrl('/get-subs'));

export const getSubCategory = async (slug) => axios.get(getBaseUrl(`/get-sub/${slug}`));

export const deleteSubCategory = async (slug, accessToken) =>
	axios.delete(getBaseUrl(`/remove-sub/${slug}`), {
		headers: {
			accessToken,
		},
	});

export const updateSubCategory = async (slug, subName, parent, accessToken) =>
	axios.put(
		getBaseUrl(`/update-sub/${slug}`),
		{ name: subName, categoryId: parent },
		{
			headers: {
				accessToken,
			},
		}
	);

export const createSubCategory = async (subName, categoryId, accessToken) =>
	axios.post(
		getBaseUrl('/create-sub'),
		{ name: subName, categoryId },
		{
			headers: {
				accessToken,
			},
		}
	);
