import React from 'react';

const SelectOption = ({ items, itemId, setValue, label, name }) => {
	const onChangeHandler = (e) => {
		e.preventDefault();
		setValue(e.target.value);
	};

	return (
		<div className='form-group'>
			<label className='text-info font-weight-bold'>{label}</label>
			<select
				className='form-control'
				name={name}
				onChange={onChangeHandler}>
				<option
					disabled
					selected='selected'>
					please select root category
				</option>
				{items.length > 0 &&
					items.map((item) => (
						<option
							value={item._id}
							key={item._id}
							selected={itemId === item._id}>
							{item.name}
						</option>
					))}
			</select>
		</div>
	);
};

export default SelectOption;
