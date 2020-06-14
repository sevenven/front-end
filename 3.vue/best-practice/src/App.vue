<template>
  <div id="app">
    <!-- 路由 -->
    <div id="nav">
      <router-link to="/">
        <svg-icon icon-class="Moneymanagement"></svg-icon>Home
      </router-link>|
      <router-link to="/about">
        <svg-icon icon-class="editor"></svg-icon>About
      </router-link>
    </div>
    <!-- 4.路由视图 -->
    <!-- 问题：router-link和router-view是哪来的 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
