import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * User Change Password
 */
export const changePassword = async (
  oldPassword: string,
  password: string,
  password_confirmation: string
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        data: { oldPassword, password, password_confirmation },
        url: `${API_URL}admin/change-password`,
        headers: {
          Authorization: jwt,
        },
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
