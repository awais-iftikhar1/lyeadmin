import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';

/**
 * User Login
 */
export const userLogin = async (
  username: string,
  password: string
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await Axios({
        data: { username, password },
        url: `${API_URL}admin/login`,
        // headers: {
        //   'content-type': 'application/x-www-form-urlencoded',
        // },
        method: 'POST',
      });
      console.info(data, '---- POST Express');
      resolve({
        ...data,
        message: data.message,
      });
    } catch (error: any) {
      console.error('Failed to post user express interest', error);
      reject(
        typeof error.response.data.message == 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      );
    }
  });
};
