import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/mock/api/getAuthList',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: 'success',
				data: [
					{
						name: '项目列表',
						roleId: 1,
						viewRole: '',
						roleList: [
							{
								name: '项目详情',
								roleId: 4,
								viewRole: '',
								roleList: [
									{
										name: '审核',
										roleId: 5
									}
								]
							},
							{
								name: '查看',
								roleId: 2
							},
							{
								name: '删除',
								roleId: 3
							}
						]
					},
					{
						name: '工程列表',
						roleId: 6,
						viewRole: '',
						roleList: [
							{
								name: '工程详情',
								roleId: 9,
								viewRole: '',
								roleList: [
									{
										name: '修改',
										roleId: 10
									}
								]
							},
							{
								name: '查看',
								roleId: 7
							},
							{
								name: '删除',
								roleId: 8
							}
						]
					},
					{
						name: '用户管理',
						roleId: 11,
						viewRole: '',
						roleList: [
							{
								name: '删除',
								roleId: 14,
								viewRole: ''
							},
							{
								name: '查看',
								roleId: 12
							},
							{
								name: '修改',
								roleId: 13
							}
						]
					},
					{
						name: '角色管理',
						roleId: 15,
						viewRole: '',
						roleList: [
							{
								name: '角色删除',
								roleId: 17,
								viewRole: ''
							},
							{
								name: '查看',
								roleId: 18
							},
							{
								name: '修改',
								roleId: 16
							}
						]
					}
				]
			};
		}
	}
] as MockMethod[];
