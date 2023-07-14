import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';
import { PackagesDetails } from '../../modules/apps/package-management/packages-list/packagesModel';

/**
 * Edit Admin Packages
 */
export const editPackages = async (data:PackagesDetails): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      debugger
      const { data: obj } = await Axios({

        data: {
         id: data.id,
         packageName: data.packageName,
         actualPackagePrice: data.actualPackagePrice,
         engines: data.engines,
         currency: data.currency,
         discount: data.discount,
         discountedPackagePrice: data.discountedPackagePrice,
         discountExpiresDay: data.discountExpiresDay
        },
        // url: `${API_URL}admin-package/update/${packageId}`,
        // headers: {
        //   Authorization: jwt,
        // },
        url: `${API_URL}package/editPackage`,
        headers: {
          auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJjdXN0b21lcklkIjpudWxsLCJjb21wYW55IjpudWxsLCJmaXJzdE5hbWUiOiJtb2l6IiwibGFzdE5hbWUiOiJraGFuIiwicGhvbmVObzEiOjMzMzAyNDY0MzMsInBob25lTm8yIjpudWxsLCJlbWFpbCI6Im1vaXpAZ21haWwuY29tIiwiZGF0ZU9mRW1wbG95bWVudCI6IjIwMjItMTItMzFUMTQ6MzE6NTEuMDAwWiIsImRhdGVFbXBsb3ltZW50VGVybWluYXRpb24iOm51bGwsImJpcnRoRGF0ZSI6bnVsbCwiY291bnRyeSI6bnVsbCwicGFzc3dvcmRDb3B5IjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCRwNklBSzZMb1M4NzFyZU9uYzhtVWkuMG5RTGNkbTVLOVoyQVdMOTFrWTM2MC4vc2d1Qzg2bSIsInN0YXRlIjpudWxsLCJyb2xlSWQiOjIsImFkZHJlc3MiOm51bGwsImN1cnJlbnRMb2NhdGlvbklkIjpudWxsLCJmY21Ub2tlbiI6bnVsbCwiZGV2aWNlVG9rZW4iOm51bGwsIm5vdGVzIjpudWxsLCJpc0xvZ2luIjpudWxsLCJsbmFtZSI6bnVsbCwiYWNjb3VudFR5cGUiOiJBZG1pbiIsInN0YXR1cyI6MSwiY3JlYXRlZEF0IjoiMjAyMi0xMi0zMVQxNDozMTo1MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0zMVQxNDozMTo1MS4wMDBaIn0sImlhdCI6MTY3ODYzOTcxNX0.bqDjEE5lF_NkAWZn7kMjyLCP1ggfh7iwsLozu1crLys',
          phone_number:'3330246433'
        },
        method: 'POST',
      });
      console.info(obj, '---- PUT Express');
      resolve({
        ...obj,
        message: obj.message,
      });
    } catch (error: any) {
      console.error('Failed to post user express interest', error);
      reject(
        typeof error.response.obj.message == 'string'
          ? error.response.obj.message
          : error.response.obj.message[0]
      );
    }
  });
};
