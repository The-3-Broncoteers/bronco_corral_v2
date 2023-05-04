import { useEffect } from 'react';
import { axiosPrivate } from '../config/axiosConfig';
import { useAuth } from './useAuth';
import useRefreshToken from './useRefreshToken';

export const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
				}
				return config;
			},
			(error) => {
				console.log('Error in request interceptor:', error);
				return Promise.reject(error);
			},
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					return axiosPrivate(prevRequest);
				} else {
					console.log('Error in response interceptor:', error);
					return Promise.reject(error);
				}
			},
		);

		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refresh]);

	return axiosPrivate;
};
