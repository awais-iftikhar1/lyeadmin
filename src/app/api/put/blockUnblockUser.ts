import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Edit Admin Packages
 */
export const userBlockUnblock = async (
  lotteryId: string,
  user_blocked: boolean
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        data: { lotteryId, user_blocked },
        url: `${API_URL}admin-users/block-unblock-user/${lotteryId}`,
        headers: {
          Authorization: jwt,
        },
        method: 'PUT',
      });
      console.info(data, '---- PUT Express');
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
