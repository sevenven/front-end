import { defineStore } from 'pinia';
import pinia from '@/store';
import { userLogin, refreshUserInfo } from '@/api/user';

export interface UserState {
	username: string;
	accessToken: string;
	refreshToken?: string;
	roles: Array<string>;
}

export type LoginRequest = {
	username: string;
	password: string;
};

export const useUserStoreHook = defineStore('userInfo', {
	state: (): UserState => ({
		username: 'seven',
		accessToken: '',
		roles: ['common']
	}),
	getters: {},
	actions: {
		storeUserLogin(data: LoginRequest) {
			return userLogin(data).then(res => {
				this.username = res.username;
				this.accessToken = res.accessToken;
				this.roles = res.roles;
				return res;
			});
		},
		stroeRefreshUserInfo() {
			if (this.username == 'seven' && this.accessToken != '') {
				refreshUserInfo({
					accessToken: this.accessToken
				})
					.then(res => {
						this.username = res.username;
						this.roles = res.roles;
						this.accessToken = res.accessToken;
					})
					.catch(() => {
						this.accessToken = '';
					});
			}
		}
	},
	persist: {
		key: 'userInfo',
		storage: sessionStorage,
		paths: ['accessToken']
	}
});

export function useUserStore() {
	return useUserStoreHook(pinia);
}
