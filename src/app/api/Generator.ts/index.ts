import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { MakeType } from '../../modules/apps/make-management/types';
import { VehicleType } from '../../modules/apps/vehicle-management/types';
import { GeneratorType } from '../../modules/apps/generator-management/types';


export const viewFuelUsed = async (): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}generator/viewFuelUsed`,
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

export const viewFuelSystem = async (): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}generator/viewFuelSystem`,
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


export const viewGenerator = async (pageSize:number,page:number): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}generator/viewGenerator?page=${page}&pageSize=${pageSize}`,
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



export const addGenerator = async (data:GeneratorType): Promise<IUser> => {
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
          url: `${API_URL}generator/addGenerator`,
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

  export const editGenerator = async (data:GeneratorType): Promise<IUser> => {
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
          url: `${API_URL}generator/editGenerator`,
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
          url: `${API_URL}generator/deleteGenerator`,
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
  
  
