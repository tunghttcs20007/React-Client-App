import React from 'react';

const STATUS = ['NOT PROCESSED', 'PROCESSING', 'DISPATCHED', 'CANCELED', 'COMPLETED'];

const PaymentInfo = ({ order }) => {
	let statusClassName = '';

	switch (order.orderStatus) {
		case 'NOT PROCESSED':
			statusClassName = 'bg-secondary';
			break;
		case 'PROCESSING':
			statusClassName = 'bg-info';
			break;
		case 'DISPATCHED':
			statusClassName = 'bg-primary';
			break;
		case 'CANCELED':
			statusClassName = 'bg-danger';
			break;
			break;
		case 'COMPLETED':
			statusClassName = 'bg-success';
			break;
	}

	return (
		<div className='pb-2'>
			<span>
				<b>Order ID: </b>
				{order._id}
			</span>
			<br />
			<span>
				<b>Transaction ID: </b>
				{order.paymentData.paymentIntent.id}
			</span>
			<br />
			<span>
				<b>Amount: </b>
				{`${(order.paymentData.paymentIntent.amount /= 100).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})} `}
			</span>
			<span className='badge bg-warning text-light'>
				<b>{order.paymentData.paymentIntent.currency.toUpperCase()}</b>
			</span>
			<br />
			<span>
				<b>Payment Method: </b>
				{`${order.paymentData.paymentIntent.payment_method_types[0].toUpperCase()} `}
			</span>
			<span className='badge bg-success text-light'>
				<b>{order.paymentData.paymentIntent.status.toUpperCase()}</b>
			</span>
			<br />
			<span>
				<b>Order Date: </b>
				{`${new Date(order.paymentData.paymentIntent.created * 1000).toLocaleString()} `}
			</span>
			<span className={`badge ${statusClassName} text-light`}>{order.orderStatus}</span>
		</div>
	);
};

export default PaymentInfo;
