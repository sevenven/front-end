<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link to="/home/message"> Message </router-link>
        </li>
        <li>
          <router-link to="/home/news"> News </router-link>
        </li>
      </ul>
      <br />
      <!-- 缓存路由组件 -->
      <keep-alive :include="['News']">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    console.log("Home组件 mounted", this);
    window.homeRouter = this.$router;
    window.homeRoute = this.$route;
  },
  beforeDestroy() {
    console.log("Home组件 console");
  },
};
</script>
