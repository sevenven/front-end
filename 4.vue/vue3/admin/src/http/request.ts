import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

interface BaseResponse<T = any> {
	code: number | string;
	message: string;
	data: T;
	status?: number | string;
}

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_DEV_USE_MOCK
		? import.meta.env.VITE_APP_MOCK_BASEURL
		: import.meta.env.VITE_APP_API_BASEURL,
	timeout: 15000
});

// axios实例拦截请求
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);
// axios实例拦截响应
service.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return response.data;
		}
		ElMessage({
			type: 'error',
			message: getMessageInfo(response.status)
		});
	},
	// 请求失败
	(error: any) => {
		const { response } = error;
		if (response) {
			ElMessage({
				type: 'error',
				message: getMessageInfo(response.status)
			});
			return Promise.reject(response.data);
		}
		ElMessage({
			type: 'error',
			message: '网络连接异常，请稍后再试'
		});
	}
);

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
	return new Promise((resolve, reject) => {
		service.request<any, AxiosResponse<BaseResponse>>(config).then((res: AxiosResponse<BaseResponse>) => {
			const { code, message } = res;
			if (code != 0) {
				ElMessage({
					message: message,
					type: 'error'
				});
				reject(message as T);
			} else {
				ElMessage({
					message: message,
					type: 'success'
				}); // 此处返回data信息 也就是 api 中配置好的 Response类型
				resolve(res as T);
			}
		});
	});
};

export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'GET', params: parms });
}
export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'POST', data: data });
}

export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'PUT', params: parms });
}
export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'DELETE', data: data });
}

export default service;
