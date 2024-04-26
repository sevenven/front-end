<template>
	<div class="login-box">
		<div class="login-form">
			<h1>企业中后台管理系统</h1>
			<el-form show-message :model="userInfo" :rules="rules" center class="login-info">
				<el-form-item prop="username">
					<el-input v-model="userInfo.username" type="text" :prefix-icon="User" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="userInfo.password" type="password" :prefix-icon="Lock" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="width: 100%" @click="userLogin">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
const router = useRouter();
const userInfo = reactive({
	username: 'admin',
	password: 'admin'
});
const rules = reactive({
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur'
		}
	],
	password: [
		{
			required: true,
			message: '请输入密码',
			trigger: 'blur'
		}
	]
});
function userLogin() {
	userStore.storeUserLogin(userInfo).then(() => {
		router.push('/');
	});
}
</script>
<style lang="less" scoped>
.login-box {
	justify-content: space-evenly;
	display: flex;
	align-items: center;
	height: 100vh;
	background: var(seven-backgroud-color);
	margin: 0 5px 0 5px;

	.login-form {
		flex-direction: column;
		display: flex;
		width: 300px;
		text-align: center;

		.login-info {
			height: max-content;
		}
	}
}
</style>
