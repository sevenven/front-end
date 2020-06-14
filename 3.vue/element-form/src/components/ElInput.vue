<template>
  <input :type="type" :value="value" @input="handleInput" v-bind="$attrs" />
</template>
<script>
import emitter from '../mixins/emitter.js'
export default {
  name: 'ElInput',
  inheritAttrs: false,
  mixins: [emitter],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
      this.$dispatch('ElFormItem', 'validate');
      // this.$parent.$emit('validate')
    }
  },
};
</script>

<style lang="scss" scoped>
  input {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-size: 16px;
    &:focus {
      outline: none;
      border: 1px solid #409eff;
    }
  }
</style>