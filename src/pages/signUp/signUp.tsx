import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../../assets/icons/chart';
import Facebook from '../../assets/icons/facebook';
import Google from '../../assets/icons/google';
// import Logo from '../../assets/icons/logo';
import Input from '../../components/input';

import { Notification, NotificationContainer } from '../../hooks/useNotification';

import { createUserFailure, createUserRequest } from '../../store/user/actions';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userState = useSelector((state: any) => state.user);

  useEffect(() => {
    if (userState.data?.success) {
      Notification('success', 'Sign Up Success!');
      history.push('/admin/login');
    } else {
      if (userState.errors !== null) {
        Notification('error', userState.errors);
        dispatch(createUserFailure(null));
      }
    }
  }, [userState]);

  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormState({ ...formState, [e.target.name]: e.target.value }),
    [formState],
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (formState.password !== formState.confirmPassword) {
      Notification('error', 'Password is not correct');
      setSubmitting(false);
      return;
    }

    const payload = {
      username: formState.username,
      email: formState.email,
      password: formState.password,
      role: 'admin',
      status: 'active',
    };

    await dispatch(createUserFailure(null));
    await dispatch(createUserRequest(payload));

    setSubmitting(false);
  };

  return (
    <div className="sign_in_page d-flex justify-content-center align-items-center text-light position-relative">
      <div className="sign_in_page__icon">
        <Chart size={50} />
      </div>
      <div className="sign_in_page__box d-flex flex-column">
        <div className="mx-auto mb-5 logo-wrapper">
          {/* <Logo size={52} /> */}
          <h1>Admin</h1>
        </div>
        <h3 className="fw-bold fs-2">Sign Up</h3>
        <p>Welcome to Affect Cx Use</p>
        <form className="sign_in_page__form d-grid" onSubmit={onSubmit}>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            icon="envelope"
            name="username"
            onChange={handleInputChange}
            required
          />
          <Input
            id="email-address"
            type="email"
            placeholder="Email address"
            icon="envelope"
            name="email"
            onChange={handleInputChange}
            required
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            icon="lock"
            name="password"
            onChange={handleInputChange}
            required
          />
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            icon="lock"
            name="confirmPassword"
            onChange={handleInputChange}
            required
          />
          <button className="btn btn-primary mt-5 btn-lg" type="submit">
            <span className="text-light">Sign Up</span>
          </button>
        </form>
        <p className="fs-6 mt-4 mb-4">
          Already have your account?{' '}
          <a href="/admin/login" className="text-primary ml-1">
            Login with your account
          </a>
        </p>
        <div className="position-relative">
          <p className="sign_in_page__text">Sign Up With</p>
        </div>
        <div className="row">
          <div className="col">
            <button className="w-100 btn btn-light btn-lg">
              <Google size={24} />
              <span className="fs-6 ms-1">Sign Up with Google</span>
            </button>
          </div>
          <div className="col">
            <button className="w-100 btn btn-light btn-lg">
              <Facebook size={24} />
              <span className="fs-6 ms-1">Sign Up with Facebook</span>
            </button>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default SignUp;
