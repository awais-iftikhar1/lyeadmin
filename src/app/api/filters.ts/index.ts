import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';
import { FuelType } from '../../modules/apps/fuel-management/types';
import { Filter } from '../../modules/apps/filter-management/types';


export const getFilters = async (
  filterTypeId: number,
  limit: number,
  offset: number
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        url: `${API_URL}filter/viewFilter?filterTypeId=${filterTypeId}`,
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


export const addFilters = async (data:Filter): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        const { data:obj } = await Axios({
         data,
          url: `${API_URL}filter/addFilter`,
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

  export const editFilters = async (data:Filter): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
          data:{
            id:data.id,
            filterTypeId: data.filterTypeId,
            manufactureName : data.manufactureName,
            partNo : data.partNo,
            price : data.price,

         },
          url: `${API_URL}filter/editFilter`,
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

  export const deleteFilters = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${API_URL}filter/deleteFilter`,
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
  
  
