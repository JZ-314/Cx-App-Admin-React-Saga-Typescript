import React, { useState, useEffect, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/dataTable';

import { fetchUserRequest, createUserSuccess } from '../../store/user/actions';
import { openModal } from '../../store/app/actions';
import MainLayout from '../../components/layout/main';

export default function User() {
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(JSON.parse(localStorage.getItem('accessToken'))
  const columnDefs = [
    {
      name: 'User',
      selector: (row: any) => row['username'],
      minWidth: '200px',
      sortable: true,
      cell: (row: any) => (
        <a href="/admin/users" className="table-username-link">
          <span>{row['username']}</span>
        </a>
      ),
    },
    {
      name: 'Email',
      minWidth: '250px',
      selector: (row: any) => row['email'],
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row: any) => row['role'],
      sortable: true,
      cell: (row: any) => (
        <div className="table-role-column">
          {row.role === 'admin' && (
            <div className="table-admin-role">
              <i className="fas fa-user-shield table-role-icon"></i> Admin
            </div>
          )}
          {row.role === 'manager' && (
            <div className="table-manager-role">
              <i className="fa fa-user table-role-icon"></i> Manager
            </div>
          )}
          {row.role === 'sale_rep' && (
            <div className="table-sale-role">
              <i className="fa fa-user table-role-icon"></i> Sale Repo
            </div>
          )}
          {row.role === 'client' && (
            <div className="table-client-role">
              <i className="fa fa-user table-role-icon"></i> Client
            </div>
          )}
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row: any) => row['status'],
      sortable: true,
      minWidth: '150px',
      cell: (row: any) => (
        <div>
          {row.status === 'active' && (
            <div className="badge badge-pill table-admin-status">Active</div>
          )}
          {row.status === 'pending' && (
            <div className="badge badge-pill table-sale-status">Pending</div>
          )}
          {row.status === 'inactive' && (
            <div className="badge badge-pill table-client-status">Inactive</div>
          )}
        </div>
      ),
    },
    {
      name: 'Actions',
      selector: (row: any) => row['action'],
      cell: (row: any) => {
        return (
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn btn-outline-secondary mx-1"
              onClick={handleClickEdit(row)}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            {row.role !== 'admin' && (
              <button
                type="button"
                className="btn btn-outline-danger mx-1"
                onClick={handleClickRemoveUser(row)}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const resUserData: any = useSelector((state: any) => state.user.userList);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserRequest());
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setUserData(resUserData);
  }, [resUserData]);

  const initialStateData = async () => {
    await dispatch(createUserSuccess(null));
  };

  const handleClickCreate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    initialStateData();
    const payload = {
      type: 'create',
    };
    history.push(`/admin/user/edit`, { userParams: payload });
  };

  const handleClickEdit = (row: any) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    initialStateData();
    const payload = {
      type: 'update',
      data: row,
    };
    history.push(`/admin/user/edit`, { userParams: payload });
  };

  const handleClickRemoveUser = (row: any) => async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      openModal({
        modal: 'DELETE_USER',
        params: row,
      }),
    );
  };

  return (
    <MainLayout>
      {isLoading ? (
        <div></div>
      ) : (
        <div className="user-page-wrapper p-4">
          <div className="card">
            <div className="card-header d-flex justify-content-end">
              <button className="btn btn-success mx-1" onClick={handleClickCreate}>
                Add New User
              </button>
            </div>
            <div className="card-body">
              <div className="user-data-table">
                <DataTable rowData={userData} columnDefs={columnDefs} />
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
