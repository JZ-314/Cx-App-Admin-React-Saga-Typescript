import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../store/app/actions';
import DeleteUserModal from './deleteUserModal';

const Modal = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const renderModal = () => {
    switch (app.currentModal) {
      case 'DELETE_USER':
        return <DeleteUserModal closeModal={handleCloseModal} />;
      default:
        return null;
    }
  };

  if (!app.modalOpen) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-container">{renderModal()}</div>
    </div>
  );
};

export default Modal;
