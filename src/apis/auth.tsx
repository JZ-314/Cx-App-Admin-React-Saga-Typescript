import CxClient from '../utils/axios';

export const authenticate = async (payload: any) => {
  try {
    const response: any = await CxClient.post('/auth/login', payload);
    return response.data;
  } catch (e) {
    return e;
  }
};
