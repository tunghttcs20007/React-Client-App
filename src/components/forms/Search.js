import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;
	const dispatch = useDispatch();

	const history = useHistory();

	const handleChange = (e) => {
		//TODO: implement on change event
	};
	const handleSubmit = (e) => {
		//TODO: implement on submit event
	};

	return <div>Search</div>;
};

export default Search;
