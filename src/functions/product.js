import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

export const createProduct = async (product, accessToken) =>
	axios.post(getBaseUrl('/create-product'), product, {
		headers: {
			accessToken,
		},
	});
