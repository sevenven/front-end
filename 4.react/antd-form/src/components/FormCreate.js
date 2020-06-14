import React, { useState } from 'react';

const formCreate = Cmp => props => {
  const [state, setState] = useState({});
  const options = {};
  const setChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }
  const getFieldDecorator = (field, option) => InputCmp => {
    options[field] = option;
    return React.cloneElement(InputCmp, {
      name: field,
      value: state[field] || '',
      onChange: setChange
    })
  }
  const getFieldsValue = () => {
    return { ...state }
  }
  const getFieldValue = field => {
    return state[field];
  }
  const validateFields = callback => {
    const err = [];
    for (let key in options) {
      if (state[key] === undefined) {
        err.push({
          [key]: 'error!'
        });
      }
    }
    if (err.length) {
      callback(err, { ...state })
    } else {
      callback(undefined, { ...state })
    }
  }
  return (
    <Cmp {...props}
      getFieldDecorator={getFieldDecorator}
      getFieldsValue={getFieldsValue}
      getFieldValue={getFieldValue}
      validateFields={validateFields}
    />
  )
}

export default formCreate;