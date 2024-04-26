import { get } from '@/http/request';

export const getProjectList = async data => {
	return get({}, '/projects', data);
};
