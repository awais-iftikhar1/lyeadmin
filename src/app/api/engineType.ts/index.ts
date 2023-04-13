import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';
import { EngineType } from '../../modules/apps/engine-management/types';

/**
 * Fetch Packages Data.
 */
// export const getEngineType = async (jwt: string): Promise<IUser> => {
export const getEngineType = async (
  limit: number,
  offset: number
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${'http://135.148.40.91:2000/api/'}engineType/viewEngineType?limit=${limit}&offset=${offset}`,
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


export const addEngineType = async (data:EngineType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      const jwt: any = getAuth();
  
      try {
        const { data:obj } = await Axios({
         data,
          url: `${'http://135.148.40.91:2000/api/'}engineType/addEngineType`,
          method: 'POST',
        });
        console.info(obj, '---- GET Express');
        resolve({
          ...obj,
          message: obj.message,
        });
      } catch (error: any) {
        debugger
        console.error('Failed to post user express interest', error);
        reject(error.response.obj.message)
      }
    });
  };

  export const editEngineType = async (data:EngineType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      const jwt: any = getAuth();
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{
            id:data.id,
            typeName : data.typeName,
            noOfCylinders :data.noOfCylinders
         },
          url: `${'http://135.148.40.91:2000/api/'}engineType/editEngineType`,
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
        reject(error.response.data.errors[0].msg)
      }
    });
  };

  export const deleteEngineType = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      const jwt: any = getAuth();
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${'http://135.148.40.91:2000/api/'}engineType/deleteEngineType`,
          method: 'POST',
        });
        console.info(obj, '---- GET Express');
        resolve({
          ...obj,
          message: obj.message,
        });
      } catch (error: any) {
        debugger
        console.error('Failed to post user express interest', error);
        reject(error.response.obj.message)
      }
    });
  };
  
  
