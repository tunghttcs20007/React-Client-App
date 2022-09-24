import { getBaseUrl } from '../utils/getBaseUrl';
import axios from 'axios';

export const createOrUpdateUser = async (accessToken) => {
	return axios.post(
		getBaseUrl('/create-or-update-user'),
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
		getBaseUrl('/current-user'),
		{},
		{
			headers: {
				accessToken,
			},
		}
	);
};
