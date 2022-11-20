import React, { useState, useEffect, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, searchProductByFilter } from '../functions/product';
import { getAllCategories } from '../functions/category';
import { getAllSubCategories } from '../functions/sub';
import ProductCard from '../components/cards/ProductCard';
import CardLoading from '../components/cards/CardLoading';
import Ratings from '../components/ratings/Ratings';
import FilterMenu from '../components/filter-menu/FilterMenu';

const initialState = {
	price: [0, 4999],
	category: [],
	subCategory: '',
	stars: '',
	brand: '',
	color: '',
	shipping: '',
};

const ShopSearch = () => {
	const [componentState, setComponentState] = useState(initialState);
	const [products, setProducts] = useState([]);
	const [isSliderMarked, setIsSliderMarked] = useState(false);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;
	const dispatch = useDispatch();

	//Fetch products by default
	useEffect(() => {
		setLoading(true);
		fetchAllProducts();
		getAllCategories().then((res) => setCategories(res.data));
		getAllSubCategories().then((res) => setSubCategories(res.data));
	}, []);

	const fetchAllProducts = () => {
		getAllProducts(setProducts).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	};

	const fetchProductsWithFilter = (filter) => {
		searchProductByFilter(filter).then((res) => {
			setProducts(res.data);
		});
	};

	//Fetch products by text
	useEffect(() => {
		if (text === '') return;
		const timer = setTimeout(() => {
			fetchProductsWithFilter({ query: text });
			setComponentState(initialState);
		}, 800);
		return () => clearTimeout(timer);
	}, [text]);

	//Fetch products by price range
	useEffect(() => {
		fetchProductsWithFilter({ price: componentState.price });
	}, [isSliderMarked]);

	const handleSliderChange = (value) => {
		dispatch({
			type: 'SEARCH_TEXT',
			payload: { text: '' },
		});
		setComponentState({ ...initialState, price: value });
		setTimeout(() => {
			setIsSliderMarked(!isSliderMarked);
		}, 1500);
	};

	//Fetch products by selected category
	const handleCategoryCheck = (e) => {
		let checkedCategory = [...componentState.category];
		let newCheckedCategory = e.target.value;
		let categoryIndex = checkedCategory.indexOf(newCheckedCategory); //return index or -1

		if (categoryIndex === -1) {
			checkedCategory.push(newCheckedCategory);
		} else {
			checkedCategory.splice(categoryIndex, 1); //remove only 1 item
		}

		setComponentState({ ...initialState, category: checkedCategory });
		if (checkedCategory.length === 0) {
			fetchAllProducts();
			return;
		}
		dispatch({
			type: 'SEARCH_TEXT',
			payload: { text: '' },
		});
		fetchProductsWithFilter({ category: checkedCategory });
	};

	//Fetch products by stars rating
	const handleStarOptionClick = (stars) => {
		dispatch({
			type: 'SEARCH_TEXT',
			payload: { text: '' },
		});
		setComponentState({ ...initialState, stars });
		fetchProductsWithFilter({ stars });
	};

	//Fetch products by sub category
	const handleClickSubOption = (subCategory) => {
		setComponentState({ ...initialState, subCategory });
		fetchProductsWithFilter({ subCategory });
		dispatch({
			type: 'SEARCH_TEXT',
			payload: { text: '' },
		});
	};

	//Fetch products by brand
	const handleSelectBrandOption = (e) => {
		dispatch({
			type: 'SEARCH_TEXT',
			payload: { text: '' },
		});
		setComponentState({ ...initialState, brand: e.target.value });
		fetchProductsWithFilter({ brand: e.target.value });
	};

	//Fetch products by color
	const handleSelectColorOption = (e) => {
		dispatch({
			type: 'SEARCH_TEXT',
			payload: { text: '' },
		});
		setComponentState({ ...initialState, color: e.target.value });
		fetchProductsWithFilter({ color: e.target.value });
	};

	//Fetch products by shipping
	const handleSelectShippingOption = (e) => {
		dispatch({
			type: 'SEARCH_TEXT',
			payload: { text: '' },
		});
		setComponentState({ ...initialState, shipping: e.target.value });
		fetchProductsWithFilter({ shipping: e.target.value });
	};

	const renderProductsList = useMemo(() => {
		if (products.length > 0) {
			return (
				<div className='row pb-3'>
					{products.map((product) => (
						<div
							key={product._id}
							className='col-md-4 mt-2'>
							<Ratings product={product} />
							<ProductCard product={product} />
						</div>
					))}
				</div>
			);
		} else {
			return <h5 className='text-info'>No products found!</h5>;
		}
	}, [products]);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-3 pt-2'>
					<FilterMenu
						price={componentState.price}
						handleSliderChange={handleSliderChange}
						category={categories}
						handleCategoryCheck={handleCategoryCheck}
						categoryIds={componentState.category}
						star={componentState.stars}
						handleClickStarOption={handleStarOptionClick}
						subCategory={subCategories}
						handleClickSubOption={handleClickSubOption}
						selectedBrand={componentState.brand}
						handleSelectBrandOption={handleSelectBrandOption}
						selectedColor={componentState.color}
						handleSelectColorOption={handleSelectColorOption}
						selectedShipping={componentState.shipping}
						handleSelectShippingOption={handleSelectShippingOption}
					/>
				</div>
				<div className='col-md-9 pt-2'>
					{loading && <CardLoading count={10} />}
					{renderProductsList}
				</div>
			</div>
		</div>
	);
};

export default memo(ShopSearch);
