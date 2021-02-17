import React from 'react';
import { FormContext  } from "./FormContext";
import useForm from './useForm';

export default function Form ({children, form, onFinish, onFinishFailed}, ref) {
  const [formInstance] = useForm(form);
  React.useImperativeHandle(ref, () => formInstance);
  formInstance.setCallbacks({onFinish, onFinishFailed});
  return (
    <form onClick={(event) => {
      event.preventDefault();
      formInstance.submit();
    }}>
      <FormContext.Provider value={formInstance}>
        {children}
      </FormContext.Provider>
    </form>
  )
}