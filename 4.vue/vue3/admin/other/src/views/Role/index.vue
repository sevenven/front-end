<template>
	<div>
		<el-form>
			<el-form-item>
				<el-button type="primary" @click="onAddRole">新增角色</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="roleList" border style="width: 100%">
			<el-table-column prop="roleId" label="角色id" width="180px"></el-table-column>
			<el-table-column prop="roleName" label="角色名称" width="180px"></el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" size="mini" @click="onChangeAuth(scope.row)">修改权限</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script lang="ts" setup>
import { getRoleList } from '@/api/role';

const router = useRouter();

interface IRole {
	role: number; // 角色id
	roleName: string; // 角色名称
}

let roleList = ref<IRole[]>([]);

onMounted(() => {
	getRoleList({})
		.then(res => {
			roleList.value = res.data;
		})
		.catch(err => {
			console.error(err);
		});
});
const onAddRole = () => {
	ElMessageBox.prompt('请输入角色名称', '添加角色', {
		confirmButtonText: '确定',
		cancelButtonText: '取消'
	})
		.then(({ value }) => {
			if (value) {
				roleList.value.push({
					roleId: roleList.value.length + 1,
					roleName: value,
					authority: []
				});
				ElMessage({
					type: 'success',
					message: `${value}添加成功`
				});
			}
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: `点击了取消按钮`
			});
		});
};
const onChangeAuth = (row: IRole) => {
	router.push({
		path: 'auth',
		query: {
			id: row.roleId,
			auth: row.authority
		}
	});
};
</script>
