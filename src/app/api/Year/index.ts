import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { EngineOilType, OilData, OilEngineType, OilGrade } from '../../modules/apps/oilDetails-management/types';
import { EngineDetailType } from '../../modules/apps/engine-details-management/types';
import { YearData } from '../../modules/apps/year-management/types';

export const viewYear = async (): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}yearManufacture/getYear`,
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

export const addYear = async (data:YearData): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data:obj } = await Axios({
       data,
        url: `${API_URL}yearManufacture/addYear`,
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


export const editYear = async (data:YearData): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {

    try {
      debugger
      const { data:obj } = await Axios({
       data:{
          id:data.id,
          year : data.year
       },
        url: `${API_URL}yearManufacture/editYear`,
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

  export const deleteYear = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${API_URL}yearManufacture/deleteYear`,
          method: 'POST',
        });
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

