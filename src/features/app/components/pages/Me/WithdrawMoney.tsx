import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { Form, Input, InputNumber, message } from "antd";
import { useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import { mutation_p_paymentRequestCreate } from "src/features/app";
import styleAnt from "styles/Ant.module.scss";
import FieldPaymentMethod from "src/features/app/components/shared/FieldPaymentMethod";

export default function WithdrawMoney() {
  const [form] = Form.useForm();
  const spinner = useSpinner();
  const router = useRouter();

  const onFinish = (values: any) => {
    let gqlInput = {};
    let mutation = mutation_p_paymentRequestCreate;

    gqlInput = {
      input: values,
    };

    spinner?.show();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        message.success("Saved successfully.");
        router.push(`/me/payment_requests`);
      })
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, {
          capitalize: true,
        });
        message.error(msg);
      })
      .finally(() => {
        spinner?.hide();
      });
  };

  return (
    <>
      <Form
        form={form}
        className={styleAnt.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        initialValues={{
          colorPrimary: "#ff000",
          noIndex: false,
        }}
      >
        <FieldPaymentMethod />

        <Form.Item
          label='Amount'
          name='amount'
          rules={[{ required: true, message: "Field required." }]}
        >
          <InputNumber className='w-100' />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 0, span: 24 }}
          className='submitBtnRow'
        >
          <button type='submit' className='me-3 btn btn-main '>
            Save
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
