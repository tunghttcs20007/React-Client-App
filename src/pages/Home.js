import React, { Fragment, useState, useEffect } from 'react';
import TypeWriterComp from '../components/TypeWriterComp';
import NewArrivalsComp from '../components/home/NewArrivalsComp';
import BestSellersComp from '../components/home/BestSellersComp';
import { getTotalProductsCount } from '../functions/product';

const HeadingText = ['New Arrivals !!!', 'Latest Products', 'Best Products'];

const Home = () => {
	const [totalProducts, setTotalProducts] = useState(0);

	useEffect(() => {
		getTotalProductsCount().then((res) => {
			setTotalProducts(res.data);
		});
	}, []);

	return (
		<Fragment>
			<div
				className='jumbotron text-center font-weight-bold display-1 mt-2'
				id='head-writer'
				style={{
					color: '#f5f6fa',
					textShadow: '8px 8px #353b48',
					background: 'linear-gradient(165deg, #787FF6 22%, #4ADEDE 70%)',
				}}>
				<TypeWriterComp text={HeadingText} />
			</div>
			<NewArrivalsComp totaProducts={totalProducts} />
			<BestSellersComp totaProducts={totalProducts} />
			<br />
			<br />
		</Fragment>
	);
};

export default Home;
