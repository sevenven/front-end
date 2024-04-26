<template>
	<div class="header">
		<div class="flex-center">logo区域</div>
		<div class="flex-grow"></div>
		<div class="flex-center m05 color-dark-black"><i-ep-user></i-ep-user>{{ username }}</div>
		<div class="flex-center m05 color-dark-black setting" @click="settingHandle">
			<i-ep-setting></i-ep-setting>
		</div>
	</div>
	<el-drawer v-model="showSetting" :show-close="false" :with-header="false" size="300">
		<div class="setting-header">
			<h2>项目配置</h2>
			<i-ep-close @click="closeSetting"></i-ep-close>
		</div>
		<div class="out">
			<el-button type="primary" @click="logout">退出</el-button>
		</div>
	</el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStoreHook } from '@/store/user';
const router = useRouter();
// 获取用户信息
const userStore = useUserStoreHook();
const username = userStore.username;

// setting相关控制模块
let showSetting = ref(false);
const settingHandle = function () {
	showSetting.value = true;
};
const closeSetting = function () {
	showSetting.value = false;
};

const logout = function () {
	sessionStorage.removeItem('userInfo');
	router.push('/login');
};
</script>

<style scoped lang="less">
.header {
	display: flex;
	padding: 0 15px;
	width: 100%;
	height: 60px;
	box-shadow: 0 0 20px rgb(195 223 252 / 40%);

	.menu {
		width: max-content;
		height: 100%;
	}
	// 去除菜单底部边框
	.el-menu--horizontal {
		border-bottom: none;
	}
}

.setting {
	cursor: pointer;
}

.setting-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	color: var(seven-color-dark-black);
}

.out {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
