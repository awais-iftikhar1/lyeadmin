import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { IUser } from '../../user/types';
import { EngineOilType, OilData, OilEngineType, OilGrade } from '../../modules/apps/oilDetails-management/types';
import { EngineDetailType } from '../../modules/apps/engine-details-management/types';

export const viewOilManufacture = async (): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        url: `${API_URL}oilManufacture/viewOilManufacture`,
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

export const addOilManufacture = async (data:OilData): Promise<IUser> => {
  
  return new Promise(async (resolve, reject) => {

    try {
      const { data:obj } = await Axios({
       data,
        url: `${API_URL}oilManufacture/addOilManufacture`,
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


export const editOilManufacture = async (data:OilData): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {

    try {
      debugger
      const { data:obj } = await Axios({
       data:{
          id:data.id,
          name : data.name
       },
        url: `${API_URL}oilManufacture/editOilManufacture`,
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

  export const deleteOilManufacture = async (id:string): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{id},
          url: `${API_URL}oilManufacture/deleteOilManufacture`,
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


  export const viewOilType = async (): Promise<IUser> => {
  
    return new Promise(async (resolve, reject) => {
  
      try {
        const { data } = await Axios({
          // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
          url: `${API_URL}oilType/viewOilType`,
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
  
  export const addOilType = async (data:OilData): Promise<IUser> => {
    
    return new Promise(async (resolve, reject) => {
  
      try {
        const { data:obj } = await Axios({
         data,
          url: `${API_URL}oilType/addOilType`,
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
  
  
  export const editOilType = async (data:OilData): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
  
      try {
        debugger
        const { data:obj } = await Axios({
         data:{
            id:data.id,
            name : data.name
         },
          url: `${API_URL}oilType/editOilType`,
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
  
    export const deleteOilType = async (id:string): Promise<IUser> => {
      return new Promise(async (resolve, reject) => {
    
        try {
          debugger
          const { data:obj } = await Axios({
           data:{id},
            url: `${API_URL}oilType/deleteOilType`,
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


    export const viewOilGrade = async (): Promise<IUser> => {
  
      return new Promise(async (resolve, reject) => {
    
        try {
          const { data } = await Axios({
            // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
            url: `${API_URL}oilGrade/viewOilGrade`,
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
    
    export const addOilGrade = async (data:OilGrade): Promise<IUser> => {
      
      return new Promise(async (resolve, reject) => {
    
        try {
          const { data:obj } = await Axios({
           data,
            url: `${API_URL}oilGrade/addOilGrade`,
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
    
    
    export const editOilGrade = async (data:OilGrade): Promise<IUser> => {
      return new Promise(async (resolve, reject) => {
    
        try {
          debugger
          const { data:obj } = await Axios({
           data:{
              id:data.id,
              oilGrade : data.oilGrade
           },
            url: `${API_URL}oilGrade/editOilGrade`,
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
    
      export const deleteOilGrade = async (id:string): Promise<IUser> => {
        return new Promise(async (resolve, reject) => {
      
          try {
            debugger
            const { data:obj } = await Axios({
             data:{id},
              url: `${API_URL}oilGrade/deleteOilGrade`,
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
      


      export const viewOilEngineType = async (): Promise<IUser> => {
  
        return new Promise(async (resolve, reject) => {
      
          try {
            const { data } = await Axios({
              // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
              url: `${API_URL}oilEngineType/viewOilEngineType`,
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
      
      export const addOilEngineType = async (data:OilEngineType): Promise<IUser> => {
        
        return new Promise(async (resolve, reject) => {
      
          try {
            const { data:obj } = await Axios({
             data,
              url: `${API_URL}oilEngineType/addOilEngineType`,
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
      
      
      export const editOilEngineType = async (data:OilEngineType): Promise<IUser> => {
        return new Promise(async (resolve, reject) => {
      
          try {
            debugger
            const { data:obj } = await Axios({
             data:{
                id:data.id,
                engineType : data.engineType
             },
              url: `${API_URL}oilEngineType/editOilEngineType`,
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
      
        export const deleteOilEngineType = async (id:string): Promise<IUser> => {
          return new Promise(async (resolve, reject) => {
        
            try {
              debugger
              const { data:obj } = await Axios({
               data:{id},
                url: `${API_URL}oilEngineType/deleteOilEngineType`,
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
        


        export const viewEngineOilDetails = async (): Promise<IUser> => {
  
          return new Promise(async (resolve, reject) => {
        
            try {
              const { data } = await Axios({
                // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
                url: `${API_URL}engineOilDetails/viewEngineOilDetails`,
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
        
        export const addEngineOilDetails = async (data:EngineOilType): Promise<IUser> => {
          
          return new Promise(async (resolve, reject) => {
        
            try {
              const { data:obj } = await Axios({
               data,
                url: `${API_URL}engineOilDetails/addEngineOilDetails`,
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
        
        
        export const updateEngineOilDetails = async (data:EngineOilType): Promise<IUser> => {
          return new Promise(async (resolve, reject) => {
        
            try {
              debugger
              const { data:obj } = await Axios({
               data:{
                  id:data.id,
                  ...data
               },
                url: `${API_URL}engineOilDetails/updateEngineOilDetails`,
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
        
          export const deleteEngineOilDetails = async (id:string): Promise<IUser> => {
            return new Promise(async (resolve, reject) => {
          
              try {
                debugger
                const { data:obj } = await Axios({
                 data:{id},
                  url: `${API_URL}engineOilDetails/deleteEngineOilDetails`,
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
    


          
    export const viewTestLocation = async (): Promise<IUser> => {
  
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
    
  
  
