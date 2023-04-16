import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { VehicleType } from '../../modules/apps/vehicle-machine-management/types';
import { MakeType } from '../../modules/apps/make-management/types';


export const getMake = async (
  filterType:string,
  limit: number,
  offset: number
): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${'http://135.148.40.91:2000/api/'}make/getMake?type=${filterType}&limit=${limit}&offset=${offset}`,
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


export const addMake = async (data:MakeType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        const { data:obj } = await Axios({
         data :{
          ...data,
         },
          url: `${'http://135.148.40.91:2000/api/'}make/addMake`,
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

  export const editMake = async (data:MakeType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      
      try {
        debugger
        const { data:obj } = await Axios({
         data:{
            id:data.id,
            ...data
            
         },
          url: `${'http://135.148.40.91:2000/api/'}make/editMake`,
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

  export const deleteMake = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${'http://135.148.40.91:2000/api/'}make/deleteMake`,
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
  
  
