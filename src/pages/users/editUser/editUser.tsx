/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Notification, NotificationContainer } from '../../../hooks/useNotification';
import Select from '../../../components/select';

import {
  fetchUserRequest,
  createUserRequest,
  updateUserRequest,
  createUserFailure,
  updateUserFailure,
} from '../../../store/user/actions';
import MainLayout from '../../../components/layout/main';

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Sale Rep', value: 'sale_rep' },
  { label: 'Client', value: 'client' },
];

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Inactive', value: 'inactive' },
];

export default function EditUser() {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();

  const userParams = location.state.userParams;
  const userState = useSelector((state: any) => state.user);

  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
    role: roleOptions[0].value,
    status: statusOptions[0].value,
  });
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const [teamFormState, setTeamFormState] = useState({
    name: '',
  });
  const [teamsArray, setTeamsArray] = useState([]);

  // fill user input forms
  useEffect(() => {
    if (userParams.type === 'update') {
      const data = userParams.data;
      setFormState({
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role,
        status: data.status,
      });
      setSelectedRole({
        label: capitalize(data.role),
        value: data.role,
      });
      setSelectedStatus({
        label: capitalize(data.status),
        value: data.status,
      });
      setTeamsArray(data?.teams);
    }
  }, [userParams]);

  // get user action state
  useEffect(() => {
    if (userState?.data?.success) {
      Notification('success', userState?.data?.message);
      history.push('/admin/users');
    } else {
      Notification('error', userState?.data?.message);
    }
  }, [userState]);

  const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    },
    [formState],
  );

  const handleSelectChange = (type: string) => (selectedOption: any) => {
    setFormState({ ...formState, [type]: selectedOption.value });

    if (type === 'role') {
      setSelectedRole(selectedOption);
    } else if (type === 'status') {
      setSelectedStatus(selectedOption);
    }
  };

  // teams form
  const handleTeamsInputChange = (e: any) => {
    setTeamFormState({ ...teamFormState, [e.target.name]: e.target.value });
  };

  const handleClickAddTeam = () => {
    if (teamFormState.name !== '') {
      setTeamsArray([...teamsArray, teamFormState]);
      setTeamFormState({
        name: '',
      });
    }
  };

  const handleClickRemoveTeamRow = (index: number) => () => {
    const updated = [...teamsArray.slice(0, index), ...teamsArray.slice(index + 1)];
    setTeamsArray(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      email: formState.email,
      username: formState.username,
      password: formState.password,
      role: formState.role,
      status: formState.status,
      teams: teamsArray,
    };

    if (userParams.type === 'create') {
      await dispatch(createUserFailure(null));
      await dispatch(createUserRequest(payload));
      await dispatch(fetchUserRequest());
    } else {
      const userId = userParams.data.id;
      await dispatch(updateUserFailure(null));
      await dispatch(updateUserRequest(userId, payload));
      await dispatch(fetchUserRequest());
    }
    setSubmitting(false);
  };

  return (
    <MainLayout>
      <div className="edit-user-page-wrapper p-4">
        <h2>{capitalize(userParams.type) + ' User'}</h2>
        <div className="card">
          <div className="card-body">
            <div className="user-input-form">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <Select
                        name="role"
                        value={selectedRole}
                        options={roleOptions}
                        onChange={handleSelectChange('role')}
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        value={formState.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  {userParams.type === 'create' && (
                    <div className="col-lg-7 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={formState.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <Select
                        name="status"
                        value={selectedStatus}
                        options={statusOptions}
                        onChange={handleSelectChange('status')}
                      />
                    </div>
                  </div>
                  {selectedRole.value === 'manager' && (
                    <div className="teams-form-wrapper mb-3">
                      <div className="teams-title-wrapper d-flex align-items-center mb-2">
                        <h4 className="m-0">Teams</h4>
                      </div>
                      {userParams.type === 'create' && (
                        <div className="row teams-input-form d-flex align-items-center">
                          <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="teamName">Team Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Team Name"
                                name="name"
                                value={teamFormState.name}
                                onChange={handleTeamsInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12">
                            <button
                              type="button"
                              className="btn btn-outline-primary mt-2 px-2 py-1"
                              onClick={handleClickAddTeam}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      )}
                      {teamsArray?.map((item: any, index: any) => (
                        <div className="row teams-input-rows d-flex" key={index}>
                          <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="form-group">
                              <input
                                type="teamName"
                                className="form-control"
                                placeholder="Team Name"
                                name="teamName"
                                value={item.name}
                                readOnly
                              />
                            </div>
                          </div>
                          {userParams.type === 'create' && (
                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <button
                                type="button"
                                className="btn btn-outline-danger px-2 py-1"
                                onClick={handleClickRemoveTeamRow(index)}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="user-edit-form-button-wrapper">
                  <button type="submit" className="btn btn-primary">
                    <span className="text-light">Save</span>
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </MainLayout>
  );
}
