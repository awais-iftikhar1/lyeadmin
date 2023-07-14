import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Fetch Packages Data.
 */
// export const getFuelType = async (jwt: string): Promise<IUser> => {
export const getFuelType = async (
  limit: number,
  offset: number
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}fuelType/viewFuelType?limit=${limit}&offset=${offset}`,
        method: 'GET',
      });
      console.info(data, '---- GET Express');
      resolve({
        ...data,
        message: data.message,
      });
    } catch (error: any) {
      debugger
      console.error('Failed to post user express interest', error);
      reject(error.response.data.message)
    }
  });
};
