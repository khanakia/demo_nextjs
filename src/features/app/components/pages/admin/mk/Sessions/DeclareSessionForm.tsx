import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, InputNumber, message } from "antd";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { ShowWrap, useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import styleAnt from "styles/Ant.module.scss";
import { mutation_mk_adm_declareSession } from "src/features/app";
import { useUserRole } from "src/features/auth";
import { listPageLink, titleSingular, titlePlural } from "./constant";

type FormProps = {
  id?: string;
  onSubmit?: Function;
};

export default function DeclareSessionForm(props: FormProps) {
  const { id, onSubmit } = props;
  const [form] = Form.useForm();
  const [saveRedirect, setSaveRedirect] = useState(false);
  const spinner = useSpinner();
  // const { user } = useAuth()
  const userRole = useUserRole();
  const router = useRouter();

  const submitForm = () => {
    setSaveRedirect(true);
    form.submit();
  };

  const onFinish = (values: any) => {
    // console.log(values)
    // return
    if (!id) return;

    values.id = id;

    let gqlInput = {};
    let mutation = mutation_mk_adm_declareSession;
    gqlInput = {
      input: values,
    };

    spinner?.show();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        // console.log(res);
        message.success("Declared successfully.");

        router.push(listPageLink);

        if (typeof onSubmit == "function") {
          onSubmit(saveRedirect);
        }
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
      <h5>Declare Session</h5>
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
        <Form.Item label='Number' name='num' rules={[{ required: true, message: "Field required." }]}>
          <InputNumber />
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
