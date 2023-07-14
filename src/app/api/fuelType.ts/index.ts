import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';
import { FuelType } from '../../modules/apps/fuel-management/types';

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


export const addFuelType = async (data:FuelType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      const jwt: any = getAuth();
  
      try {
        const { data:obj } = await Axios({
         data,
          url: `${API_URL}fuelType/addFuelType`,
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
        reject(error.response.data.message)
      }
    });
  };

  export const editFuelType = async (data:FuelType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      const jwt: any = getAuth();
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{
            id:data.id,
            typeName : data.typeName
         },
          url: `${API_URL}fuelType/editFuelType`,
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

  export const deleteFuelType = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      const jwt: any = getAuth();
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${API_URL}fuelType/deleteFuelType`,
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
        reject(error.response.data.message)
      }
    });
  };
  
  
