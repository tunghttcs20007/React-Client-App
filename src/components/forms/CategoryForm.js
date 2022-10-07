import React from 'react';

const CategoryForm = ({
	handleSubmit,
	value,
	setValue,
	isLoading,
	type,
	label,
	placeHolder,
}) => (
	<form onSubmit={handleSubmit}>
		<div className='form-group'>
			<label className='font-weight-bold'>
				{label} {isLoading && <i className='fa-solid fa-spinner text-info'></i>}
			</label>
			<input
				type='text'
				className='form-control pt-2'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeHolder}
				autoFocus
				required
			/>
			<div>
				<button className='btn btn-outline-primary mt-2'>{type}</button>
			</div>
		</div>
	</form>
);

export default CategoryForm;
