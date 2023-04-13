import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';
import { FuelType } from '../../modules/apps/fuel-management/types';
import { Filter, FilterType } from '../../modules/apps/filter-management/types';


export const getFilterType = async (
  limit: number,
  offset: number
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        url: `${'http://135.148.40.91:2000/api/'}filterType/viewFilterType?limit=${limit}&offset=${offset}`,
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


export const addFilterType = async (data:FilterType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        const { data:obj } = await Axios({
         data,
          url: `${'http://135.148.40.91:2000/api/'}filterType/addFilterType`,
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

  export const editFilterType = async (data:FilterType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{
            id:data.id,
            type : data.type
         },
          url: `${'http://135.148.40.91:2000/api/'}fuelType/editFuelType`,
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

  export const deleteFilterType = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${'http://135.148.40.91:2000/api/'}filterType/deleteFilterType`,
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
  
  
