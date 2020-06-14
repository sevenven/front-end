<template>
  <div id="app">
    <el-form :model="model" :rules="rules" ref="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="model.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

// import ElForm from "./components/ElForm.vue";
// import ElFormItem from "./components/ElFormItem.vue";
// import ElInput from "./components/ElInput.vue";
// import ElButton from "./components/ElButton.vue";

export default {
  name: "App",
  // components: {
  //   ElForm,
  //   ElFormItem,
  //   ElInput,
  //   ElButton
  // },
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(isValid => {
        if (isValid)
          this.$toast({
            message: "校验成功"
          });
        else
          this.$toast({
            message: "校验失败"
          });
      });
    }
  }
};
</script>

<style>
</style>