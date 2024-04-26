<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>性别：{{ sex }}</h2>
  <h2>a的值是：{{ a }}</h2>
  <button @click="sayHello">说话(Vue3所配置的——sayHello)</button>
  <br />
  <br />
  <button @click="sayWelcome">说话(Vue2所配置的——sayWelcome)</button>
  <br />
  <br />
  <button @click="test1">测试一下在Vue2的配置中去读取Vue3中的数据、方法</button>
  <br />
  <br />
  <button @click="test2">
    测试一下在Vue3的setup配置中去读取Vue2中的数据、方法
  </button>
</template>

<script>
import { h } from "vue";

export default {
  name: "App",
  /* vue3中使用vue2语法---start---建议vue2&vue3写法不混用 */
  data() {
    return {
      sex: "男",
      a: 100,
    };
  },
  methods: {
    sayWelcome() {
      alert("欢迎来到尚硅谷学习");
    },
    test1() {
      // 访问vue2中的属性&方法
      console.log(this.sex);
      console.log(this.sayHello);
      // 访问setup中属性&方法
      console.log(this.name);
      console.log(this.age);
    },
  },
  /* vue3中使用vue2语法---end */

  /* 此处只是测试一下setup，暂时不考虑响应式的问题。 */
  setup() {
    // 数据
    let name = "张三";
    let age = 18;
    let a = 200;

    // 方法
    function sayHello() {
      alert(`我叫${name}，我${age}岁了，你好啊！`);
    }

    function test2() {
      // 访问vue2中的属性&方法---不可以读取到
      console.log(this.sex);
      console.log(this.sayWelcome);
      // 访问setup中属性&方法
      console.log(name);
      console.log(age);
      console.log(sayHello);
    }

    // 返回一个对象--->常用
    // return {
    //   name,
    //   age,
    //   sayHello,
    //   test2,
    //   a,
    // };

    /* 返回一个渲染函数--->会直接替换掉template中的内容 */
    return () => h("h1", "尚硅谷");
  },
};
</script>
