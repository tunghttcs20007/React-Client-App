import React, { useEffect } from 'react';

const DropdownSelect = ({
	items,
	selectedItemId,
	setValue,
	label,
	name,
	defaultOption,
	clazzName,
	onChangeHandler,
}) => {
	const handleChange = (e) => {
		e.preventDefault();
		setValue(e.target.value);
	};

	const onChange = onChangeHandler ?? handleChange;

	const showDropdown = () => {
		if (items.some((item) => (item._id ? true : false))) {
			return items.map((item) => (
				<option
					value={item._id}
					key={item._id}
					selected={selectedItemId === item._id}>
					{item.name}
				</option>
			));
		} else {
			return items.map((item) => (
				<option
					key={item}
					value={item}>
					{item}
				</option>
			));
		}
	};

	return (
		<div className='form-group'>
			<label className={clazzName}>{label}</label>
			<select
				className='form-control'
				name={name}
				onChange={onChange}
				defaultValue='default'>
				<option
					disabled
					value='default'>
					{defaultOption}
				</option>
				{showDropdown()}
			</select>
		</div>
	);
};

export default DropdownSelect;
