import React, { Component, /* useEffect */ } from 'react';
// import Form, { Field } from 'rc-field-form';
import Form, { Field } from '../../imitations/RCFieldForm';
import Input from './Components/Input';

const nameRules = {
  required: true,
  message: "请输入姓名！"
}

const passwordRules = {
  required: true,
  message: "请输入密码！"
}

// export default function RCFieldFormPage() {

//   const [form] = Form.useForm();

//   const onFinish = val => {
//     console.log("onFinish", val);
//   }

//   const onFinishFailed = val => {
//     console.log("onFinishFailed", val);
//   }

//   useEffect(() => {
//     form.setFieldsValue({username: 'seven'});
//   }, form)

//   return (
//     <div>
//       <h3>RCFieldFormPage</h3>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <Field name="username" label="姓名" rules={[nameRules]}>
//           <Input placeholder="username placeholder" />
//         </Field>
//         <Field name="password" label="密码" rules={[passwordRules]}>
//           <Input placeholder="password placeholder" />
//         </Field>
//         <button>Submit</button>
//       </Form>
//     </div>
//   );
// }

export default class MyRCFieldForm extends Component {

  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({username: "seven"});
  }

  onFinish = val => {
    console.log("onFinish", val);
  };

  // 表单校验失败执行
  onFinishFailed = val => {
    console.log("onFinishFailed", val);
  };

  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Field name="username" rules={[nameRules]}>
            <Input placeholder="Username" />
          </Field>
          <Field name="password" rules={[passwordRules]}>
            <Input placeholder="Password" />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    );
  }
}