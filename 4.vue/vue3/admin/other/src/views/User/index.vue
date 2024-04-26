<template>
	<div>
		<el-form :inline="true" class="search-form" :model="searchData">
			<el-form-item label="用户名称">
				<el-input v-model="searchData.nickName" placeholder="请输入用户名称" />
			</el-form-item>
			<el-form-item label="用户角色">
				<el-select v-model="searchData.role" style="width: 173px">
					<el-option :key="0" label="全部" :value="0" />
					<el-option v-for="item in roleWithAuthList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSearchUser">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="userList" border style="width: 100%">
			<el-table-column prop="id" label="编号" width="180" />
			<el-table-column prop="nickName" label="用户昵称" width="180" />
			<el-table-column prop="role" label="用户角色">
				<template #default="scope">
					<el-button v-for="item in scope.row.role" :key="item.role" link type="primary" size="small">
						{{ item.roleName }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="role" label="操作">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
	<!-- 编辑用户的弹出窗-->
	<el-dialog v-model="editShow" title="编辑用户信息">
		<el-form :model="editUser">
			<el-form-item label="用户昵称" label-width="120px">
				<el-input v-model="editUser.nickName" class="w192" autocomplete="off" />
			</el-form-item>
			<el-form-item label="用户角色" label-width="120px">
				<el-select v-model="editUser.role" multiple class="m-2" size="large" placeholder="请选择角色">
					<el-option v-for="item in roleWithAuthList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="editShow = false">取消</el-button>
				<el-button type="primary" @click="ensureEditUser">修改</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';
// 角色接口
interface IRole {
	role: number; // 角色id
	roleName: string; // 角色名称
}

// 有权限的角色接口
interface IRoleWithAuth {
	roleId: number;
	roleName: string;
	authority: [];
}
// 用户接口
interface IUser {
	id: number;
	userName: string;
	nickName: string;
	role: IRole[];
}
// 用户查询接口
interface IQueryUser {
	nickName: string; // 用户别名
	role: number; // 角色编号
}
// 用户编辑接口
interface IUserEdit {
	id: number; // 用户id
	nickName: string; // 用户昵称
	role: number[]; // 用户角色
	userName: string; // 用户名
}
const searchData = reactive<IQueryUser>({
	nickName: '',
	role: 0
});
// 角色权限列表
let roleWithAuthList = ref<IRoleWithAuth[]>([]);
// 用户列表
let userList = ref<IUser[]>([]);

// 编辑用户弹窗
const editShow = ref(false);
// 编辑用户信息
// let editUser: IUserEdit = {};
let editUser = reactive<IUserEdit>({
	id: 0,
	nickName: '',
	role: [],
	userName: ''
});
// 查询用户
const handleSearchUser = () => {
	let res: IUser[] = [];
	if (searchData.nickName || searchData.role) {
		if (searchData.nickName) {
			res = userList.value.filter(item => {
				return item.nickName.indexOf(searchData.nickName) !== -1;
			});
		}
		if (searchData.role) {
			res = searchData.nickName ? res : userList.value;
			res = res.filter(item => {
				return item.role.find(value => {
					return value.role === searchData.role;
				});
			});
		}
	} else {
		res = userList.value;
	}
	userList.value = res;
};
// watch 监听
watch([() => searchData.nickName, () => searchData.role], () => {
	if (searchData.nickName === '' || searchData.role === 0) {
		fetchUserList();
	}
});
// 编辑用户
const handleEditUser = (row: IUser) => {
	editShow.value = true;
	Object.assign(editUser, {
		...row,
		role: row.role.map(value => value.role)
	});
	// console.log(editUser);
	// 按照下面这样定义就使用响应式了
	// editUser = {
	//     id: row.id,
	//     nickName: row.nickName,
	//     userName: row.userName,
	//     // role: row.role,
	//     role: row.role.map((value) => value.role),
	// };
};
const ensureEditUser = () => {
	console.log(editUser);
	editShow.value = false;
	// 取出来修改的对象
	let obj: IUser = userList.value.find(item => item.id === editUser.id);
	// 修改了nickName
	obj.nickName = editUser.nickName;
	//  obj.role.splice(0, obj.role.length)  // 清除角色
	obj.role = []; // 清除角色
	console.log(obj);
	roleWithAuthList.value.forEach(element => {
		if (editUser.role.find(value => value === element.roleId)) {
			obj.role.push({
				role: element.roleId, // 角色id
				roleName: element.roleName // 角色名称
			});
		}
	});
};
// 初始化数据
onMounted(() => {
	fetchUserList(); // 获取全部用户数据
	fetchRoleList(); // 获取全部角色数据
});
const fetchUserList = () => {
	getUserList().then(res => {
		userList.value = res.data;
	});
};
const fetchRoleList = () => {
	getRoleList().then(res => {
		roleWithAuthList.value = res.data;
	});
};
</script>
<style lang="less" scoped>
.search-form {
	padding: 10px 0 0 10px;
}
.w192 {
	width: 192px;
}
</style>
