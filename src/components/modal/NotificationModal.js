import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_MODAL_VISIBILITY } from '../../reducers/actions/types';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-80%, -80%)',
	},
};

Modal.setAppElement('#root');

const NotificationModal = ({ title, message, handleClickYes }) => {
	const { modal } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch({ type: SET_MODAL_VISIBILITY, payload: false });
	};

	return (
		<Modal
			isOpen={modal}
			onRequestClose={closeModal}
			shouldCloseOnOverlayClick={true}
			style={customStyles}
			contentLabel='Modal'>
			<h6>{title}</h6>
			<div>{message}</div>
			<button
				className='btn btn-info'
				onClick={handleClickYes}>
				Yes
			</button>
			<button
				className='btn btn-danger float-right'
				onClick={closeModal}>
				close
			</button>
		</Modal>
	);
};

export default NotificationModal;
