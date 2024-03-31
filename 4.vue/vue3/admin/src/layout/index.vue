<template>
	<el-container>
		<el-header>
			<Header></Header>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :default-active="activeMenu" :ellipsis="false" router>
					<template v-for="item in menuList" :key="item.path">
						<el-menu-item v-if="!item.children" :index="item.path">
							<span>{{ item.meta!.title }}</span>
						</el-menu-item>
						<el-sub-menu v-else :index="item.path">
							<template #title>
								<span>{{ item.meta?.title }}</span>
							</template>
							<el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
								<span>{{ subItem.meta!.title }}</span>
							</el-menu-item>
						</el-sub-menu>
					</template>
				</el-menu>
				<!-- <el-menu-item index="/">项目介绍</el-menu-item>
				<el-menu-item index="/user"> 用户列表 </el-menu-item>
				<el-menu-item index="/role"> 角色列表 </el-menu-item>
				<el-menu-item index="/auth"> 权限列表 </el-menu-item> -->
			</el-aside>
			<el-main>
				<el-breadcrumb :separator-icon="ArrowRight">
					<el-breadcrumb-item v-for="item in settingStore.title" :key="item" :to="{ name: item }">
						{{ item }}
					</el-breadcrumb-item>
				</el-breadcrumb>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
import { useSettingStore } from '@/store/setting';
import Header from './Header/index.vue';
const settingStore = useSettingStore();
const router = useRouter();
const route = useRoute();

const menuList = router.options.routes[1].children?.filter(item => {
	return item.meta?.isShow;
});

const activeMenu = route.path;
</script>
<style scoped lang="less">
.el-header {
	padding: 0;
	margin-bottom: 5px;
}

.el-container {
	height: 100%;

	.el-menu {
		height: 100%;
	}
}

.el-breadcrumb {
	margin-bottom: 10px;
}
</style>
