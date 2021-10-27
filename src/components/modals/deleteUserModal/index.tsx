import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserRequest, deleteUserRequest } from '../../../store/user/actions';

export default function DeleteUserModal(props: any) {
  const dispatch = useDispatch();
  const { closeModal } = props;
  const modalParams = useSelector((state: any) => state.app.modalParams);

  const handleClickDelete = async () => {
    await dispatch(deleteUserRequest(modalParams.id));
    await dispatch(fetchUserRequest());
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Delete <b>{`'${modalParams.username}'`}</b>
          </h5>
        </div>
        <div className="modal-body">Would you delete this user?</div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={handleClickDelete}>
            Delete
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
