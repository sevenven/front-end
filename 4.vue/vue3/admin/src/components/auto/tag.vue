<template>
    <div class="wrap-tag">
        <span v-bind="props" ref="tag" class="tag"></span>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';
const tag = ref<HTMLElement>();
const props = defineProps({
    text: {
        type: String,
        default: null
    },
    theme: {
        type: String,
        default: null,
        require: false
    }
});
onMounted(() => {
    setText();
    setTheme();
});
const setText = () => {
    tag.value!.innerHTML = props.text;
};
const setTheme = () => {
    tag.value!.style.backgroundColor = props.theme;
};
</script>
<style lang="less" scoped>
.tag {
    padding: 10px;
    font-size: 18px;
    color: #fff;
    background-color: red;
    border-radius: 5px;
}

.wrap-tag {
    margin: 30px;
}
</style>
