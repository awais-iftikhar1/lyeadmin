import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { LocationType } from '../../modules/apps/test-location-management/types';


export const viewTestLocation = async (pageSize:number,page:number): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}testLocation/viewTestLocation`,
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





export const addTestLocation = async (data:LocationType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          //@ts-ignore
          formData.append(key, data[key] );
        }
      }
      try {
        const { data:obj } = await Axios({
         data :formData,
          url: `${API_URL}testLocation/addTestLocation`,
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

  export const editTestLocation = async (data:LocationType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      
      try {
        const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          //@ts-ignore
          formData.append(key, data[key] );
        }
      }
        const { data:obj } = await Axios({
         data:formData,
          url: `${API_URL}testLocation/editTestLocation`,
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

  export const deleteTestLocation = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${API_URL}testLocation/deleteTestLocation`,
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
  
  
