import { useRef } from "react";

class FormStore {
  constructor() {
    this.store = {}; // 仓库、存储数据
    this.fieldEntities = []; // 存储Field实例
    this.callbacks = {}; // 存储提交回调
  }

  // 注册表单项实例
  registerField = (field) => {
    this.fieldEntities.push(field)
    return () => {
      this.fieldEntities = this.fieldEntities.filter(entity => entity !== field);
      delete this.store[field.props.name];
    }
  }

  // 获取单个值
  getFieldValue = (name) => {
    return this.store[name]
  }

  // 获取所有值
  getFieldsValue = () => {
    return {...this.store};
  }

  // 修改值
  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore
    }
    this.fieldEntities.forEach(entity => {
      const { name } = entity.props;
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange();
        }
      })
    })
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks
    }
  }

  validate = () => {
    let err = [];
    this.fieldEntities.forEach((field) => {
      const { name, rules} = field.props;
      let rule = rules && rules[0];
      let value = this.getFieldValue(name);
      if (rule && rule.required && ! value) {
        err.push({
          [name]: rule.message,
          value
        })
      }
    })
    return err;
  }

  submit = () => {
    const err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      onFinish(this.getFieldsValue());
    } else {
      onFinishFailed(err, this.getFieldsValue());
    }
  }

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerField: this.registerField,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    }
  }

}

export default function useForm(form) {
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      formRef.current = new FormStore().getForm();
    }
  }
  return [formRef.current]
}