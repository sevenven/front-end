// 模仿antd3.x版表单实现
import React, { Component } from 'react';
import formCreate from '../components/FormCreate';

const nameRules = {
  required: true,
  message: "please input ur name"
};

const passwordRules = {
  required: true,
  message: "please input ur password"
};

@formCreate
class MyFormPage extends Component {
  submit = () => {
    const { getFieldsValue, getFieldValue, validateFields } = this.props;
    validateFields((err, values) => {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('success: ', values);
      }
    });
    // console.log("submit: ", getFieldsValue(), getFieldValue('name'));
  }
  render() {
    const { getFieldDecorator } = this.props;
    return (
      <div>
        <h3>MyFormPage</h3>
        <div>
          {getFieldDecorator('name', {rules: [nameRules]})(<input className="ant-input" />)}
        </div>
        <br />
        <div>
          {getFieldDecorator('password', {rules: [passwordRules]})(<input type="password" className="ant-input" />)}
        </div>
        <br />
        <button className="ant-btn" onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default MyFormPage;