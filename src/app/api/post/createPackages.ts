import Axios from '../../user/interceptor';
import { API_URL, BASE_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';
import { PackagesDetails } from '../../modules/apps/package-management/packages-list/packagesModel';

/**
 * Create Admin Packages
 */
export const createPackages = async (data : PackagesDetails): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();
    
    try {
      const { data : obj } = await Axios({
        data: { ...data},
        url: `${'http://135.148.40.91:2000/api/'}package/addPackage`,
        headers: {
          auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJjdXN0b21lcklkIjpudWxsLCJjb21wYW55IjpudWxsLCJmaXJzdE5hbWUiOiJtb2l6IiwibGFzdE5hbWUiOiJraGFuIiwicGhvbmVObzEiOjMzMzAyNDY0MzMsInBob25lTm8yIjpudWxsLCJlbWFpbCI6Im1vaXpAZ21haWwuY29tIiwiZGF0ZU9mRW1wbG95bWVudCI6IjIwMjItMTItMzFUMTQ6MzE6NTEuMDAwWiIsImRhdGVFbXBsb3ltZW50VGVybWluYXRpb24iOm51bGwsImJpcnRoRGF0ZSI6bnVsbCwiY291bnRyeSI6bnVsbCwicGFzc3dvcmRDb3B5IjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCRwNklBSzZMb1M4NzFyZU9uYzhtVWkuMG5RTGNkbTVLOVoyQVdMOTFrWTM2MC4vc2d1Qzg2bSIsInN0YXRlIjpudWxsLCJyb2xlSWQiOjIsImFkZHJlc3MiOm51bGwsImN1cnJlbnRMb2NhdGlvbklkIjpudWxsLCJmY21Ub2tlbiI6bnVsbCwiZGV2aWNlVG9rZW4iOm51bGwsIm5vdGVzIjpudWxsLCJpc0xvZ2luIjpudWxsLCJsbmFtZSI6bnVsbCwiYWNjb3VudFR5cGUiOiJBZG1pbiIsInN0YXR1cyI6MSwiY3JlYXRlZEF0IjoiMjAyMi0xMi0zMVQxNDozMTo1MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0zMVQxNDozMTo1MS4wMDBaIn0sImlhdCI6MTY3OTc2NTM5OH0.kEgSSPsxV9DHwCJpJbptNeoYkPaMrqsT2zld9Id8YG8',
          phone_number: "3330246433"
        },
        method: 'POST',
      });
      console.info(obj);
      resolve({
        ...obj,
        message: obj.message,
      });
    } catch (error: any) {
      console.error('error', error.response);
      reject(error.response.data.message)
      // reject(
      //   typeof error.response.data.message == 'string'
      //     ? error.response.data.message
      //     : error.response.data.message[0]
      // );
    }
  });
};
