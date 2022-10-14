import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { getBaseUrl } from '../../functions/getBaseUrl';
import axios from 'axios';
import { Image, Badge } from 'antd';
import { DeleteFilled, LoadingOutlined } from '@ant-design/icons';
const PreviewGroup = Image.PreviewGroup;

const FileUpload = ({ value, setValue, isSubmitted }) => {
	const [loading, setLoading] = useState(false);

	const { user: admin } = useSelector((state) => ({ ...state }));
	const accessToken = admin.token;

	let { images } = { ...value };

	useEffect(() => {
		if (isSubmitted) {
			images = [];
		}
	}, [isSubmitted]);

	const fileUploadAndResize = (e) => {
		e.preventDefault();
		let imageFiles = e.target.files;
		setLoading(true);
		if (imageFiles) {
			for (let i = 0; i < imageFiles.length; i++) {
				Resizer.imageFileResizer(
					imageFiles[i],
					720,
					720,
					'JPEG',
					100,
					0,
					(uri) => {
						axios
							.post(getBaseUrl('/images'), { image: uri }, { headers: { accessToken } })
							.then((res) => {
								images.push(res.data);
								/** Update product state images */
								setValue({ ...value, images });
								setLoading(false);
							})
							.catch((error) => {
								console.log(error);
								setLoading(false);
							});
					},
					'base64'
				);
			}
		}
	};

	const handleRemoveImage = (public_id) => {
		setLoading(true);
		console.log('Remove Image: ', public_id);
		axios
			.post(getBaseUrl('/images/remove'), { public_id }, { headers: { accessToken } })
			.then((res) => {
				/** Filter remove image from state */
				images = images.filter((image) => {
					return image.public_id !== public_id;
				});
				setValue({ ...value, images });
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const showUploadedImages = () => {
		return images.map((image) => (
			<div
				key={image.public_id}
				className='m-2 pb-2'>
				<Badge
					style={{ cursor: 'pointer' }}
					count={
						<DeleteFilled
							style={{ color: '#596275', fontSize: '15px' }}
							onClick={() => {
								handleRemoveImage(image.public_id);
							}}
						/>
					}>
					<Image
						width={110}
						height={110}
						shape='square'
						style={{ borderRadius: '50%' }}
						src={image.url}
					/>
				</Badge>
			</div>
		));
	};

	return (
		<Fragment>
			<div className='row'>
				<label
					className='btn'
					style={{ color: '#0abde3' }}>
					Upload Image {loading ? <LoadingOutlined /> : null}
					<input
						type='file'
						multiple
						hidden
						accept='images/*'
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>
			<div className='row'>
				<PreviewGroup>{images && showUploadedImages()}</PreviewGroup>
			</div>
		</Fragment>
	);
};

export default FileUpload;
