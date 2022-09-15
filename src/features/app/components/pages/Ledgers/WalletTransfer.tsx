import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { Form, Input, InputNumber, message } from "antd";
import { useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import { mutation_p_walletToWalletTransfer } from "src/features/app";
import styleAnt from "styles/Ant.module.scss";

export default function WalletTransfer() {
  const [form] = Form.useForm();
  const [saveRedirect, setSaveRedirect] = useState(false);
  const spinner = useSpinner();
  const router = useRouter();

  const submitForm = () => {
    setSaveRedirect(true);
    form.submit();
  };

  const onFinish = (values: any) => {
    // console.log(values)
    // return

    let gqlInput = {};
    let mutation = mutation_p_walletToWalletTransfer;

    gqlInput = {
      input: values,
    };

    spinner?.show();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        // console.log(res);
        message.success("Saved successfully.");

        router.push(`/ledgers`)
      })
      .catch((err) => {
        // console.log(err);
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
        // {...antFormLayout}
        className={styleAnt.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        initialValues={{
          colorPrimary: "#ff000",
          noIndex: false,
        }}
      >

        <Form.Item label='Phone' name='toUserId' rules={[{ required: true, message: "Field required." }]}>
          <Input min={10} max={10} className="w-100" />
        </Form.Item>

        <Form.Item label='Amount' name='amount' rules={[{ required: true, message: "Field required." }]}>
          <InputNumber className="w-100" />
        </Form.Item>

        <Form.Item label='Internal Note' name='internalNote' rules={[{ required: true, message: "Field required." }]}>
          <Input />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 0, span: 24 }} className='submitBtnRow'>
          <button type='button' onClick={() => submitForm()} className='me-3 btn btn-main '>
            Save
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
