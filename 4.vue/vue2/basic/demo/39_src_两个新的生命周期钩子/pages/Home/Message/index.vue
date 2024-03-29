<template>
  <div>
    <ul>
      <li v-for="message in messageList" :key="message.id">
        <!-- ---to的字符串写法--- -->
        <!-- 跳转路由并携带query参数 -->
        <!-- <router-link
          :to="`/home/message/detail?id=${message.id}&title=${message.title}`"
        >
          {{ message.title }}
        </router-link> -->
        <!-- 跳转路由并携带params参数 -->
        <router-link
          :to="`/home/message/detail/${message.id}/${message.title}`"
        >
          {{ message.title }}
        </router-link>

        <!-- ---to的对象写法--- -->
        <!-- 跳转路由并携带query参数-->
        <router-link
          replace
          :to="{
            name: 'detail',
            // path: '/home/message/detail',
            query: {
              id: message.id,
              title: message.title,
            },
          }"
        >
          {{ message.title }}
        </router-link>
        <!-- 跳转路由并携带params参数 -->
        <!-- <router-link
          :to="{
            name: 'detail',
            params: {
              id: message.id,
              title: message.title,
            },
          }"
        >
          {{ message.title }}
        </router-link> -->
        <button @click="pushShow(message)">push查看</button>
        <button @click="replaceShow(message)">replace查看</button>
      </li>
    </ul>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        { id: "001", title: "消息001" },
        { id: "002", title: "消息002" },
        { id: "003", title: "消息003" },
      ],
    };
  },
  methods: {
    pushShow(message) {
      // 编程式路由导航
      this.$router.push({
        name: "detail",
        query: {
          id: message.id,
          title: message.title,
        },
      });
    },
    replaceShow(message) {
      // 编程式路由导航
      this.$router.replace({
        name: "detail",
        params: {
          id: message.id,
          title: message.title,
        },
      });
    },
  },
};
</script>
