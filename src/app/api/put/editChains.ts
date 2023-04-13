import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Edit Admin chains
 */
export const editChain = async (
  lotteryId: string,
  chain: string,
  provider: string,
  chainId: string,
  explorer_url: string,
  native_currency: string,
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        data: {
          lotteryId,
          chain,
          provider,
          chainId,
          explorer_url,
          native_currency,
        },
        url: `${API_URL}chains/update/${lotteryId}`,
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
