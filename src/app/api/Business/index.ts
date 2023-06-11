import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { EngineOilType, OilData, OilEngineType, OilGrade } from '../../modules/apps/oilDetails-management/types';
import { EngineDetailType } from '../../modules/apps/engine-details-management/types';
import { ColorDataType } from '../../modules/apps/color-management/types';
import { BusinessDataType } from '../../modules/apps/business-management/types';

export const viewBusinessType = async (): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${'http://135.148.40.91:2000/api/'}businessType/viewBusinessType`,
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

export const addBusinessType = async (data:BusinessDataType): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data:obj } = await Axios({
       data,
        url: `${'http://135.148.40.91:2000/api/'}businessType/addBusinessType`,
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


export const editBusinessType = async (data:BusinessDataType): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {

    try {
      debugger
      const { data:obj } = await Axios({
       data:{
          id:data.id,
          type : data.type
       },
        url: `${'http://135.148.40.91:2000/api/'}businessType/editBusinessType`,
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

  export const deleteBusinessType = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${'http://135.148.40.91:2000/api/'}businessType/deleteBusinessType`,
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

