import { getPaymentBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const createStripePaymentIntent = (accessToken, coupon) =>
	axios.post(
		getPaymentBaseUrl('/stripe'),
		{ isApplyCounpon: coupon },
		{ headers: { accessToken } }
	);
