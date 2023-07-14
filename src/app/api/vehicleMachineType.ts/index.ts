import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';
import { VehicleType } from '../../modules/apps/vehicle-machine-management/types';


export const getVehicleMachineType = async (
  filterType:string,
  limit: number,
  offset: number
): Promise<IUser> => {
  console.log(filterType);
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}vehicleMachineType/viewVehicleMachineType?type=${filterType}&limit=${limit}&offset=${offset}`,
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


export const addVehicleMachineType = async (data:VehicleType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        const { data:obj } = await Axios({
         data :{
          ...data,
          typeName : data.vehicleType,
         },
          url: `${API_URL}vehicleMachineType/addVehicleType`,
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

  export const editVehicleMachineType = async (data:VehicleType): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{
            id:data.id,
            typeName : data.vehicleType,
            type: data.type
         },
          url: `${API_URL}vehicleMachineType/editVehicleType`,
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

  export const deleteVehicleMachineType = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{
          vehicleTypeId:id
        },
          url: `${API_URL}vehicleMachineType/deleteVehicleType`,
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
  
  
