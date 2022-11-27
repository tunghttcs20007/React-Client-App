import { getCommentBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const saveProductComment = async (comment, accessToken) =>
	axios.post(getCommentBaseUrl('/save-comment'), { comment }, { headers: { accessToken } });

export const getAllProductComments = async (productId) =>
	axios.get(getCommentBaseUrl(`/${productId}/list-all`));

export const updateProductCommnet = async (commentId, accessToken, content) =>
	axios.put(
		getCommentBaseUrl(`/${commentId}/update-comment`),
		{ content },
		{ headers: { accessToken } }
	);

export const removeProductComment = async (commentId, accessToken) =>
	axios.delete(getCommentBaseUrl(`/${commentId}/remove-comment`), { headers: { accessToken } });

//Comment Like, Dislike

export const getCommentLikeCount = async (commentId) =>
	axios.get(getCommentBaseUrl(`/like/${commentId}`));

export const getCommentDislikeCount = async (commentId) =>
	axios.get(getCommentBaseUrl(`/dislike/${commentId}`));

export const addLikeComment = async (commentId, userId, productId, accessToken) =>
	axios.post(
		getCommentBaseUrl(`/like/${commentId}`),
		{ userId, productId },
		{
			headers: { accessToken },
		}
	);

export const removeLikeComment = async (commentId, userId, accessToken) =>
	axios.delete(getCommentBaseUrl(`/${userId}/like/${commentId}`), {
		headers: { accessToken },
	});

export const addDislikeComment = async (commentId, userId, productId, accessToken) =>
	axios.post(
		getCommentBaseUrl(`/dislike/${commentId}`),
		{ userId, productId },
		{
			headers: { accessToken },
		}
	);

export const removeDislikeComment = async (commentId, userId, accessToken) =>
	axios.delete(getCommentBaseUrl(`/${userId}/dislike/${commentId}`), {
		headers: { accessToken },
	});
