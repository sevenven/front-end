<template>
  <ul>
    <li>消息编号：{{ id }}</li>
    <li>消息标题：{{ title }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  // props: {
  //   id: {
  //     type: String,
  //   },
  //   title: {
  //     type: String,
  //   },
  // },
  computed: {
    id() {
      return this.$route.query.id || this.$route.params.id;
    },
    title() {
      return this.$route.query.title || this.$route.params.title;
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>
