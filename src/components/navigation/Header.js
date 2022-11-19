import React, { useState } from 'react';
import { Menu } from 'antd';
import {
	HomeFilled,
	SettingOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
	ShoppingCartOutlined,
	ShopTwoTone,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../forms/SearchBar';

const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState('home');

	let dispatch = useDispatch();
	/** Get user state from Redux Store */
	let { user } = useSelector((state) => ({ ...state }));
	let history = useHistory();
	const isRoleAdmin = user && user.role === 'admin' ? true : false;
	const isRoleUser = user && user.role === 'subscriber' ? true : false;

	const handleClick = (e) => {
		setCurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: 'LOGOUT',
			payload: null,
		});
		history.push('/login');
	};

	const dashboardLink = () => {
		if (isRoleAdmin) {
			return (
				<Item>
					<Link to='/admin/dashboard'></Link>Dashboard
				</Item>
			);
		}
		if (isRoleUser) {
			return (
				<Item>
					<Link to='/user/history'></Link>Dashboard
				</Item>
			);
		}
	};

	return (
		<Menu
			onClick={handleClick}
			selectedKeys={[current]}
			mode='horizontal'>
			<Item
				key='home'
				icon={<HomeFilled />}>
				<Link to='/'>Home</Link>
			</Item>
			<Item
				key='shop'
				icon={<ShopTwoTone />}>
				<Link to='/shop'>Shop</Link>
			</Item>

			{!user && (
				<Item
					key='register'
					icon={<UserAddOutlined />}
					className='float-right'>
					<Link to='/register'>Register</Link>
				</Item>
			)}

			{!user && (
				<Item
					key='login'
					icon={<UserOutlined />}
					className='float-right'>
					<Link to='/login'>Login</Link>
				</Item>
			)}

			{user && (
				<SubMenu
					icon={<SettingOutlined />}
					title={user.name}
					className='float-right'>
					{dashboardLink()}
					<Item
						icon={<LogoutOutlined />}
						onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
			<span className='float-right p-1'>
				<SearchBar />
			</span>
		</Menu>
	);
};

export default Header;
