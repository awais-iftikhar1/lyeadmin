import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Edit Network Tokens
 */
export const editToken = async (
  tokenId: string,
  name: string,
  symbol: string,
  logo_url: string,
  network: string,
  address: string,
  decimals: number,
  token_type: string,
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        data: {
          tokenId,
          name,
          symbol,
          logo_url,
          network,
          address,
          decimals,
          token_type
        },
        url: `${API_URL}deposit-tokens/update/${tokenId}`,
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
