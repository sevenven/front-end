<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
  name: "About",
  mounted() {
    console.log("About组件 mounted", this);
    window.aboutRouter = this.$router;
    window.aboutRoute = this.$route;
  },
  beforeDestroy() {
    console.log("About组件 beforeDestroy");
  },
};
</script>
