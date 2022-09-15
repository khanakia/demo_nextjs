import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import styleAnt from "styles/Ant.module.scss";
import MkFieldSession from "src/features/app/components/shared/MkFieldSession"

type FormProps = {
  id?: string;
  data?: any;
  onSubmit?: Function;
};

export default function Form1(props: FormProps) {
  const { data = {}, onSubmit=() => {} } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values)
    onSubmit(values)
    return
  };

  return (
    <>
      <Form
        form={form}
        className={styleAnt.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
      >

        <MkFieldSession />

        <Form.Item label='User Phone' name='userPhone'>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }} className='submitBtnRow'>
          <button type='submit' className='me-3 btn btn-main '>
            Search
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
