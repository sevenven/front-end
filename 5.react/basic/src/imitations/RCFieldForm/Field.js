import React, { Component } from 'react';
import { FormContext } from './FormContext'
export default class Field extends Component {

  static contextType = FormContext;

  componentDidMount() {
    this.unregisterField = this.context.registerField(this);
  }

  componentWillUnmount() {
    this.unregisterField();
  }

  onStoreChange = () => {
    this.forceUpdate();
  }

  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name),
      onChange: (event) => {
        setFieldsValue({[name]: event.target.value})
      }
    }
  }

  render() { 
    const { children } = this.props;
    return React.cloneElement(children, this.getControlled());
  }
}