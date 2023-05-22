import { API_URL } from './../config/constants/endpoints';
import axios, { AxiosRequestConfig } from 'axios';

const Axios = axios.create({
	baseURL: API_URL,
});

/**
 * Axios API requests interceptor
 */

Axios.interceptors.request.use((req:AxiosRequestConfig<any>) => {
	const auth_token = JSON.parse(localStorage.getItem('auth_token')!);
	const phone_no = localStorage.getItem('phone_no');
	if(req.headers){
		req.headers.auth_token =  auth_token ? `${auth_token}` : '';
		req.headers.phone_number =  phone_no ? `${phone_no}` : '';
		req.headers.device_token =  '1234567';
		req.headers.platform ='adminpanel'
	}
    return req;
});

Axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		const message = error.response?.data?.statusCode || error.message;
		message === 401 && localStorage.clear(); 
		if (message === 401 || message === 403) {
			window.location.pathname = '/';
		}
		return Promise.reject(error);
	}
)

export default Axios;