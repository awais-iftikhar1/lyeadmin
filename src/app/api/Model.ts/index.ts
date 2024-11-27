import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { VehicleType } from '../../modules/apps/vehicle-machine-management/types';
import { ModelType } from '../../modules/apps/model-management/types';


export const getModel = async (
  filterType:number,
  limit: number,
  offset: number
): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}model/getModel?makeId=${filterType}&limit=${limit}&offset=${offset}`,
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


export const addModel= async (data:ModelType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        const { data:obj } = await Axios({
         data :{
          ...data,
         },
          url: `${API_URL}model/addModel`,
          method: 'POST',
        });
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

  export const editModel = async (data:ModelType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      
      try {
        debugger
        const { data:obj } = await Axios({
         data:{
            id:data.id,
            ...data
            
         },
          url: `${API_URL}model/editModel`,
          method: 'POST',
        });
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

  export const deleteModel = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${API_URL}model/deleteModel`,
          method: 'POST',
        });
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
  
  
