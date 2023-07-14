import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { MakeType } from '../../modules/apps/make-management/types';
import { VehicleType } from '../../modules/apps/vehicle-management/types';


export const viewMake = async (filterType:string): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}vehicle/viewMake?type=${filterType}`,
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



export const viewVehicleType = async (filterType:string): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}vehicle/viewVehicleType?type=${filterType}`,
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

export const viewModel = async (filterType:string): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}vehicle/viewModel?makeId=${filterType}`,
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


export const viewVehicle = async (filterType:string,pageSize:number,page:number): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}vehicle/viewVehicle?type=${filterType}&page=${page}&pageSize=${pageSize}`,
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

export const viewColor = async (): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}vehicle/viewColour`,
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

export const viewYear = async (): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        url: `${API_URL}vehicle/viewYear`,
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



export const addVehicle = async (data:VehicleType): Promise<IUser> => {
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
          url: `${API_URL}vehicle/addVehicle`,
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

  export const editVehicle = async (data:VehicleType): Promise<IUser> => {
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
          url: `${API_URL}vehicle/editVehicle`,
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
          url: `${API_URL}make/deleteMake`,
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
  
  
