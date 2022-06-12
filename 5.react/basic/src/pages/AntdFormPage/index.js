import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter, useHistory, useLocation, useRouteMatch, useParams } from '../../imitations/ReactRouterDom';

const nameRules = {
  required: true,
  message: "请输入姓名！"
}

const passwordRules = {
  required: true,
  message: "请输入密码！"
}

function AntdFormPage(props) {

  const [form] = Form.useForm();

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const params = useParams();
  
  console.log('history~~~~~~~~', history);
  console.log('location~~~~~~~~', location);
  console.log('match~~~~~~~~', match);
  console.log('params~~~~~~~~', params);

  // console.log(props)

  const onFinish = val => {
    console.log("onFinish", val);
  }

  const onFinishFailed = val => {
    console.log("onFinishFailed", val);
  }

  useEffect(() => {
    form.setFieldsValue({username: 'seven'});
  })

  return (
    <div>
      <h3>AntdFormPage</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="username" label="姓名" rules={[nameRules]}>
          <Input placeholder="username placeholder" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[passwordRules]}>
          <Input placeholder="password placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AntdFormPage;

// export default withRouter(AntdFormPage)