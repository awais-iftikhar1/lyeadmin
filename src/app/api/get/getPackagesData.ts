import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Fetch Packages Data.
 */
// export const getPackagesData = async (jwt: string): Promise<IUser> => {
export const getPackagesData = async (
  limit: number,
  offset: number
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        // url: `${API_URL}package/viewPackage?limit=${limit}&offset=${offset}`,
        // headers: {
        //   Authorization: jwt,
        // },
        url: `${'http://135.148.40.91:2000/api/'}package/viewPackage?limit=${limit}&offset=${offset}`,
        headers: {
          auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJjdXN0b21lcklkIjpudWxsLCJjb21wYW55IjpudWxsLCJmaXJzdE5hbWUiOiJtb2l6IiwibGFzdE5hbWUiOiJraGFuIiwicGhvbmVObzEiOjMzMzAyNDY0MzMsInBob25lTm8yIjpudWxsLCJlbWFpbCI6Im1vaXpAZ21haWwuY29tIiwiZGF0ZU9mRW1wbG95bWVudCI6IjIwMjItMTItMzFUMTQ6MzE6NTEuMDAwWiIsImRhdGVFbXBsb3ltZW50VGVybWluYXRpb24iOm51bGwsImJpcnRoRGF0ZSI6bnVsbCwiY291bnRyeSI6bnVsbCwicGFzc3dvcmRDb3B5IjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCRwNklBSzZMb1M4NzFyZU9uYzhtVWkuMG5RTGNkbTVLOVoyQVdMOTFrWTM2MC4vc2d1Qzg2bSIsInN0YXRlIjpudWxsLCJyb2xlSWQiOjIsImFkZHJlc3MiOm51bGwsImN1cnJlbnRMb2NhdGlvbklkIjpudWxsLCJmY21Ub2tlbiI6bnVsbCwiZGV2aWNlVG9rZW4iOm51bGwsIm5vdGVzIjpudWxsLCJpc0xvZ2luIjpudWxsLCJsbmFtZSI6bnVsbCwiYWNjb3VudFR5cGUiOiJBZG1pbiIsInN0YXR1cyI6MSwiY3JlYXRlZEF0IjoiMjAyMi0xMi0zMVQxNDozMTo1MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0zMVQxNDozMTo1MS4wMDBaIn0sImlhdCI6MTY3ODU2MTgzOH0.JqnXjAyTQU5f8nSF_DgeXTYfJyyVbpIutnyJNLwhSuE',
          phone_number: "3330246433"
        },
        method: 'GET',
      });
      console.info(data, '---- GET Express');
      resolve({
        ...data,
        message: data.message,
      });
    } catch (error: any) {
      console.error('Failed to post user express interest', error);
      reject(
        typeof error.response.data.message == 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      );
    }
  });
};
