const BASE_URL = process.env.REACT_APP_BE_BASE_URL;

const getBaseUrl = (path) => `${BASE_URL}${path}`;

console.log(BASE_URL);

export const getAdminBaseUrl = (path) => getBaseUrl(`/admin${path}`);
export const getIamBaseUrl = (path) => getBaseUrl(`/iam${path}`);
export const getCategoryBaseUrl = (path) => getBaseUrl(`/category${path}`);
export const getSubCategoryBaseUrl = (path) => getBaseUrl(`/sub-category${path}`);
export const getCouponBaseUrl = (path) => getBaseUrl(`/coupon${path}`);
export const getProductBaseUrl = (path) => getBaseUrl(`/product${path}`);
export const getPaymentBaseUrl = (path) => getBaseUrl(`/payment${path}`);
export const getUserBaseUrl = (path) => getBaseUrl(`/user${path}`);
export const getOrderBaseUrl = (path) => getBaseUrl(`/order${path}`);
export const getUploadBaseUrl = (path) => getBaseUrl(`/image${path}`);
export const getCommentBaseUrl = (path) => getBaseUrl(`/comment${path}`);
