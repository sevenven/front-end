<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <div class="bottom">吃了{{ $store.state.count }}颗糖</div>
      <span>还剩{{ $store.getters.left }}颗</span>
      <p>
        <button @click="add">吃一颗</button>
        <button @click="asyncAdd" class="left">延迟吃一颗</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    add() {
      if (this.$store.getters.left) 
        this.$store.commit("increment");
    },
    asyncAdd() {
      this.$store.dispatch("asyncIncrement").catch(() => {
        alert("暂时没有新糖哦");
      });
    },
  },
};
</script>

<style scoped>
.bottom {
  margin-bottom: 5px;
}
.left {
  margin-left: 8px;
}
</style>
