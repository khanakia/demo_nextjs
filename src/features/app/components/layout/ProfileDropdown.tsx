import React, { useEffect } from "react";

import { Menu, Dropdown, message } from 'antd';

function ProfileMenu() {

	function handleMenuClick() {
		// message.info('Click on menu item.');
		// console.log('click', e);
	}

	function logout() {

	}

	return (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="1" icon={<i className="fal fa-sign-out"></i>} onClick={logout}>
				Logout
			</Menu.Item>
		</Menu>
	);
}

export default function ProfileDropdown() {


	const toggleSider = () => {
		// jQuery(".sider1").toggleClass("siderHide")
	}

	return (
		<div className="dropdown">
			<button className="d-md-none me-2 btn btn-outline-primary btn-sm" onClick={toggleSider}><i className="fal fa-bars"></i></button>
			{/* <span className="me-2 d-none d-md-inline">You are logged in as {auth.getUserEmail()}</span> */}
	
			<Dropdown overlay={() => <ProfileMenu />}>
				<a>
					<i className="far fa-user"></i>
					<i className="fa fa-chevron-down ms-1 fs-10"></i>
				</a>
			</Dropdown>
		</div>
	);
}