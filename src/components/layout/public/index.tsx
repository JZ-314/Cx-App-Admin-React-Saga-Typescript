import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAccessToken, fetchCurrentUser, setAuthenticated } from '../../../store/app/actions';

import Header from '../../header';

type props = {
  children: React.ReactElement;
};

const PublicLayout = ({ children }: props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);

  const [isFetchUser, setIsFetchUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchAccessToken());
      setIsFetchUser(true);
    };
    fetchData();
  }, []);

  // Fetch data that is used throughout the app
  useEffect(() => {
    console.log(app);
    if (isFetchUser) {
      const authenticate = async () => {
        if (!app?.authenticated) {
          // console.log(app);
          if (app?.userToken === null) {
            history.replace('/admin/login');
            return;
          }
          await dispatch(setAuthenticated());
        }
      };

      authenticate();
    }
  }, [app, isFetchUser]);

  return (
    <div className="main-container">
      <Header />
      {children}
    </div>
  );
};

export default PublicLayout;
