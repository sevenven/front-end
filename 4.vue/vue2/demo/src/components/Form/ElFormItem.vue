<template>
  <div class="form-item">
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  name: 'ElFormItem',
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      error: ""
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      var schema = new Schema({
        [this.prop]: rules
      });
      return schema.validate(
        {
          [this.prop]: value
        },
        errors => {
          if (errors) {
            this.error = errors[0].message;
          } else {
            this.error = "";
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.form-item {
  margin-bottom: 12px;
  label {
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    margin-right: 10px;
    color: #333;
  }
  .error {
    font-size: 12px;
    color: red;
    margin: 1px 0 0;
    padding-left: 90px;
  }
}
</style>