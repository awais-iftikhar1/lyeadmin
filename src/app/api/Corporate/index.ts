import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { getAuth } from '../../modules/auth';
import { CorporateData } from '../../modules/apps/corporate-management/types';

export const viewCorporateRequests = async (): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();
    try {
      const { data } = await Axios({
        url: `${API_URL}corporateRequest/viewCorporateRequest`,
        headers: {
          auth_token: jwt,
        },
        method: 'GET',
      });
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



export const approveRequest = async (data:CorporateData): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {

    try {
      debugger
      const { data:obj } = await Axios({
       data,
        url: `${API_URL}corporateRequest/paymentReceived`,
        method: 'POST',
      });
      console.info(data, '---- GET Express');
      resolve({
        ...obj,
        message: obj.message,
      });
    } catch (error: any) {
      debugger
      console.error('Failed to post user express interest', error);
      reject(error.response.data.message)
    }
  });
};



