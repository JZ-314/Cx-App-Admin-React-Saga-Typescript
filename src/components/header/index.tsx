import React, { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dropdown from './dropdown';

import { logout } from '../../store/app/actions';

import Logo from '../../assets/icons/logo';
import UserLoggedIn from '../../assets/icons/userIn';

const dropDownList = [
  { id: 'account-settings', title: 'Account Settings' },
  // { id: 'logout', title: 'Logout' },
];

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const app = useSelector((state: any) => state.app);
  const [isClickDropIcon, setIsClickDropIcon] = useState(false);

  const handleClickLogout = async () => {
    setIsClickDropIcon(false);

    localStorage.setItem('currentUser', '');
    localStorage.setItem('accessToken', '');

    await dispatch(logout());
    history.push('/admin/login');
  };

  const handleClickUserIcon = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (app?.currentUser !== null) {
      setIsClickDropIcon(!isClickDropIcon);
    } else {
      handleClickLogout();
    }
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark fixed-top d-flex justify-content-between">
      <a className="navbar-brand logo-wrapper" href="/admin/home">
        <Logo size={30} />
      </a>
      <button className="user-icon-wrapper" onClick={handleClickUserIcon}>
        <UserLoggedIn size={16} color="#fff" />
      </button>
      {isClickDropIcon && (
        <Dropdown
          listItems={dropDownList}
          onLogout={handleClickLogout}
          onClose={() => setIsClickDropIcon(false)}
        />
      )}
    </nav>
  );
}
