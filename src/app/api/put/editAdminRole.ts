import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Edit Admin Role
 */
export const editAdminRole = async (
  role: string,
  privilege: string[],
  roleId : string,
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        data: {
          role,
          privilege,
        },
        url: `${API_URL}admin/roles/update/${roleId}`,
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
