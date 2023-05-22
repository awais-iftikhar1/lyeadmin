import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Get Login Details
 */
export const getLoginDetails = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    // const jwt: any = getAuth();

    try {
      // const { data } = await Axios({
      //   url: `${'http://135.148.40.91:2000/api/'}employee/adminLogin`,

      //   // url: `${API_URL}admin/details`,
      //   headers: {
      //     Authorization: jwt,
      //   },
      //   method: 'GET',
      // });
      // console.info(data, '---- GET Express');
      const data = {
        user:{
          adminRole:{
            privileges:[
            ]
            
          }
        },
        message:''
          
        }
      
      resolve({
        ...data,
        message: data.message,
      });
    } catch (error: any) {
      console.error('Failed to post user express interest', error);
      reject(
        typeof error.response?.data.message == 'string'
          ? error.response?.data.message
          : error.response?.data.message
      );
    }
  });
};
