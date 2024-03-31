module.exports = {
	// 向上查找eslint配置时，root为true不再继续往上查找
	root: true,
	// 指定脚本的运行环境
	env: {
		browser: true,
		es2024: true,
		node: true
	},
	// 根据指定的规范去检查指定类型的文件
	extends: [
		'eslint:recommended', // 检查js代码
		'plugin:vue/vue3-recommended', // 检查vue3代码
		'plugin:@typescript-eslint/recommended', // 检查ts代码
		// 关闭eslint中与prettier相互冲突的规则，赋予eslint用prettier格式化代码的能力
		// pnpm add eslint-config-prettier eslint-plugin-prettier -D [eslint-config-prettier 的作用是关闭 eslint 中与 prettier 相互冲突的规则][eslint-plugin-prettier 的作用是赋予 eslint 用 prettier 格式化代码的能力]
		'plugin:prettier/recommended',
		'./.eslintrc-auto-import.json'
	],
	// 这里一定要配置对 [先使用vue-eslint-parser 再使用@typescript-eslint/parser] [先解析 <template> 标签中的内容 然后再解析 vue <script> 标签中的 TS 代码]
	// 选择使用的解析器
	parser: 'vue-eslint-parser',
	// 解析器选项。指定你想支持的语言，默认支持es5。指定啥语言，eslint就按照啥语法检查。
	parserOptions: {
		// 使用最新版 ES 语法
		ecmaVersion: 'latest',
		// 使用 ESLint TS 解析器
		parser: '@typescript-eslint/parser',
		// 使用 ES 模块化规范
		sourceType: 'module'
	},
	// eslint规则
	// [off|0] 关闭规则
	// [warn|1] 启用并视作警告
	// [error|2] 启用并视作错误
	rules: {
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
};
