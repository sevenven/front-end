<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ElButton',
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin: 0 0 0 90px;
  padding: 0 20px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background-color: #409eff;
  border: 1px solid #409eff;
  border-radius: 4px;
  white-space: nowrap;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
  }
}
</style>