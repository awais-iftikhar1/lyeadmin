import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Edit Admin Packages
 */
export const editLottery = async (
  lotteryId: string,
  per_user_ticket: number,
  price: number,
  announcement_date: string,
  start_date: string,
  end_date: string,
  lotteryRewards: any,
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        data: {
          lotteryId,
          per_user_ticket,
          price,
          announcement_date,
          start_date,
          end_date,
          lotteryRewards,
        },
        url: `${API_URL}admin-lottery/update/${lotteryId}`,
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
