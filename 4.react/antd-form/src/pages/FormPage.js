import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';

const nameRules = {
  required: true,
  message: "please input ur name"
};

const passwordRules = {
  required: true,
  message: "please input ur password"
};

class FormPage extends Component {

  formRef = React.createRef();

  onFinish = values => {
    console.log(this.formRef.current)
    console.log(values);
  };

  render() {
    return (
      <div>
        <h3>FormPage</h3>
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item label="姓名" name="username" rules={[nameRules]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[passwordRules]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default FormPage;
