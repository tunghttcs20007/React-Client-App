import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserOrders } from '../../functions/user';
import UserNav from '../../components/navigation/UserNav';
import PaymentItemTable from '../../components/payment/PaymentItemTable';
import PaymentInfo from '../../components/payment/PaymentInfo';

const History = () => {
	const [orders, setOrders] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		fetchUserOrders();
	}, []);

	const fetchUserOrders = () => {
		getUserOrders(user.token).then((res) => {
			console.log(JSON.stringify(res.data, null, 2));
			setOrders(res.data);
		});
	};

	const renderUserOrdersTable = () => {
		if (orders.length > 0) {
			return (
				<div className='col'>
					<h4 className='text-center'>Your purchased orders</h4>
					{orders.map((order, index) => (
						<PaymentItemTable
							key={index}
							order={order}>
							<PaymentInfo order={order} />
						</PaymentItemTable>
					))}
				</div>
			);
		}
		return (
			<div className='col text-center'>
				<h4>No Purchased Yet</h4>
			</div>
		);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				{renderUserOrdersTable()}
			</div>
		</div>
	);
};

export default History;
