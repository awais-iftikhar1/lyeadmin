import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';
import { FuelType } from '../../modules/apps/fuel-management/types';
import { Filter, FilterType } from '../../modules/apps/filter-management/types';


export const getFilterType = async (
  pageSize:number,page:number
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        url: `${API_URL}filterType/viewFilterType?page=${page}&pageSize=${pageSize}`,
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
          url: `${API_URL}filterType/addFilterType`,
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
            typeName : data.type
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

  export const deleteFilterType = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${API_URL}filterType/deleteFilterType`,
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
  
  
