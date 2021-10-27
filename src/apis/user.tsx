import CxClient from '../utils/axios';

export const fetchUser = async () => {
  try {
    const response = await CxClient.get('/users');
    if (response.status === 200) {
      return response.data;
    }
    return response.data.message;
  } catch (e) {
    return e;
  }
};

export const createUser = async (params: any) => {
  try {
    const response = await CxClient.post('/auth/register', { ...params });

    return response.data;
  } catch (e) {
    return e;
  }
};

export const updateUser = async (userId: string, params: any) => {
  try {
    const response = await CxClient.put(`/users/${userId}`, { ...params });
    return response;
  } catch (e) {
    return e;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await CxClient.delete(`/users/${userId}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
