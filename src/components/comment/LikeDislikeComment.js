import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { LikeOutlined, DislikeOutlined, LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';
import {
	addLikeComment,
	addDislikeComment,
	removeLikeComment,
	removeDislikeComment,
	getCommentLikeCount,
	getCommentDislikeCount,
} from '../../services/comment-service';
import { errorNotify, warningNotify } from '../modal/ToastNotification';

const LikeDislikeComment = ({ commentId, userId, productId }) => {
	const [like, setLike] = useState(0);
	const [dislike, setDislike] = useState(0);
	const [likeAction, setLikeAction] = useState(null);
	const [dislikeAction, setDislikeAction] = useState(null);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		getCommentLikeCount(commentId).then((res) => {
			console.log('getLikes', res.data);

			if (res.data.success) {
				//How many likes does this video or comment have
				setLike(res.data.count);

				//if I already click this like button or not
				res.data.likes.map((like) => {
					if (like.userId === userId) {
						setLikeAction('liked');
					}
				});
			} else {
				warningNotify('Failed to get likes');
			}
		});

		getCommentDislikeCount(commentId).then((res) => {
			console.log('getDislike', res.data);
			if (res.data.success) {
				//How many likes does this video or comment have
				setDislike(res.data.count);

				//if I already click this like button or not
				res.data.dislikes.map((dislike) => {
					if (dislike.userId === userId) {
						setDislikeAction('disliked');
					}
				});
			} else {
				warningNotify('Failed to get dislikes');
			}
		});
	}, []);

	const handleClickLike = () => {
		if (likeAction === null) {
			addLikeComment(commentId, userId, productId, user.token).then((res) => {
				if (res.data.success) {
					setLike(like + 1);
					setLikeAction('liked');

					//Check if dislikeAction not null, reset state
					if (dislikeAction !== null) {
						setDislikeAction(null);
						setDislike(dislike - 1);
					}
				} else {
					errorNotify('Failed to like the comment, please try again!');
				}
			});
		} else {
			removeLikeComment(commentId, userId, user.token).then((res) => {
				if (res.data.success) {
					setLike(like - 1);
					setLikeAction(null);
				} else {
					errorNotify('Failed to undo like the comment, please try again!');
				}
			});
		}
	};

	const handleClickDislike = () => {
		if (dislikeAction !== null) {
			removeDislikeComment(commentId, userId, user.token).then((res) => {
				if (res.data.success) {
					setDislike(dislike - 1);
					setDislikeAction(null);
				} else {
					errorNotify('Failed to undo dislike, please try again!');
				}
			});
		} else {
			addDislikeComment(commentId, userId, productId, user.token).then((res) => {
				if (res.data.success) {
					setDislike(dislike + 1);
					setDislikeAction('disliked');

					//If dislike button is already clicked
					if (likeAction !== null) {
						setLikeAction(null);
						setLike(like - 1);
					}
				} else {
					errorNotify('Failed to dislike comment, please try again!');
				}
			});
		}
	};

	const renderLikeIcon = () => {
		if (likeAction === 'liked') {
			return <LikeTwoTone onClick={handleClickLike} />;
		} else {
			return <LikeOutlined onClick={handleClickLike} />;
		}
	};

	const renderDislikeIcon = () => {
		if (dislikeAction === 'disliked') {
			return <DislikeTwoTone onClick={handleClickDislike} />;
		} else {
			return <DislikeOutlined onClick={handleClickDislike} />;
		}
	};

	return (
		<React.Fragment>
			<span key='comment-basic-like'>
				<Tooltip title='Like'>{renderLikeIcon()}</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>{like}</span>
			</span>
			&nbsp;&nbsp;
			<span key='comment-basic-dislike'>
				<Tooltip title='Dislike'>{renderDislikeIcon()}</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>{dislike}</span>
			</span>
		</React.Fragment>
	);
};

export default LikeDislikeComment;
