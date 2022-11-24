import { getIamBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const createOrUpdateUser = async (accessToken) => {
	return axios.post(
		getIamBaseUrl('/user'),
		{},
		{
			headers: {
				accessToken,
			},
		}
	);
};

export const getCurrentUser = async (accessToken) => {
	return axios.post(
		getIamBaseUrl('/check-user'),
		{},
		{
			headers: {
				accessToken,
			},
		}
	);
};

export const getCurrentAdmin = async (accessToken) => {
	return axios.post(
		getIamBaseUrl('/check-admin'),
		{},
		{
			headers: {
				accessToken,
			},
		}
	);
};
