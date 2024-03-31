import { RouteRecordNormalized } from 'vue-router';
export function add(a: number, b: number) {
	return a + b;
}

export function getTitle(name: string, routes: RouteRecordNormalized[]) {
	const names: string[] = [];
	let find = false;
	while (!find) {
		names.push(name);
		const currentRouterObj = routes.find(item => item.name === name);
		const parentRouterObj = routes.find(item => item.name === currentRouterObj?.meta?.parentRouter);
		if (parentRouterObj) {
			name = parentRouterObj.name as string;
		} else {
			find = true;
		}
	}
	return names.reverse();
}
