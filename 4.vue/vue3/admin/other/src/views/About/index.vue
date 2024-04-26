<template>
	<div class="wrap-about">
		<tag :text="text" :theme="theme" />
		<tag :text="text" :theme="theme" />
		<tag :text="text" :theme="theme" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// import tag from './tag.vue';
const text = ref('seven');
const theme = ref('black');
</script>
<style lang="less" scoped>
.wrap-about {
	// color: @color;
	background: var(--seven-color-dark-black);
}
</style>
