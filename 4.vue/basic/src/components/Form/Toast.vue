<template>
  <div class="box">{{message}}</div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(this.hide, this.duration);
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translate(-50%);
  padding: 0 20px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 14px;
  color: #606266;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}
</style>