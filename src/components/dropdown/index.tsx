import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

type props = {
  listItems: any;
  onClose: any;
  onLogout: any;
};

export default function HeaderDropdown({ listItems, onClose, onLogout }: props) {
  const history = useHistory();

  const handleClickMenuItem = (item: any) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (item.id === 'account-setting') {
      history.push(`/account/overview`);
    }
    if (item.id === 'logout') {
      onLogout();
    }
    onClose();
  };

  return (
    <div className="header-dropdown-wrapper">
      <div className="menu-container">
        {listItems.map((item: any) => (
          <div key={item.id} className="menu-item" onClick={handleClickMenuItem(item)}>
            <div className="menu-item-wrapper">
              <div className="menu-item-title">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
