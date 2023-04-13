import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Set Two Factor Auth Status
 */
export const setTwoFAStatus = async (code: string): Promise<IUser> => {
  const jwt: any = getAuth();

  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await Axios({
        data: { code },
        url: `${API_URL}admin/setStatus-2FA`,
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
