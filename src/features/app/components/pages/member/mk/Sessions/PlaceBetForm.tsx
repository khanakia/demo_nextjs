import React, { useState, useEffect } from "react";
import Router, { useRouter } from 'next/router'
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { Form, Input, InputNumber, Select, message } from "antd";
import { ShowWrap, useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import styleAnt from "styles/Ant.module.scss";
import { mutation_mk_p_sessionEntryBet} from "src/features/app";
import { useUserRole } from "src/features/auth";

type FormProps = {
  onSubmit?: Function;
};

export default function PlaceBetForm(props: FormProps) {
  const {  onSubmit } = props;
  const [form] = Form.useForm();
  const [saveRedirect, setSaveRedirect] = useState(false);
  const spinner = useSpinner();
  // const { user } = useAuth()
  // const userRole = useUserRole();
  const router = useRouter()
  const { id } = router.query

  const submitForm = () => {
    setSaveRedirect(true);
    form.submit();
  };

  const onFinish = (values: any) => {
    // console.log(values)
    // return
    if(!id) return

    values.sessionId = id

    let gqlInput = {};
    let mutation = mutation_mk_p_sessionEntryBet;
    gqlInput = {
      input: values,
    };

    spinner?.show ();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        // console.log(res);
        message.success("Bet successful.");

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
      <Form
        form={form}
        // {...antFormLayout}
        className={styleAnt.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        initialValues={{
          colorPrimary: "#ff000",
          noIndex: false,
        }}
      >
      
        <Form.Item label='Num Type' name='numTypeId' rules={[{ required: true, message: "Field required." }]}>
          <Select
            // showSearch
            style={{ width: "100%" }}
            placeholder='Select Number Type'
            optionFilterProp='children'
          >
            <Select.Option key={"j"} value={"j"}>Jodi</Select.Option>
            <Select.Option key={"h"} value={"h"}>Harf</Select.Option>
            <Select.Option key={"ah"} value={"ah"}>Andar Harf</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.numTypeId !== currentValues.numTypeId}>
          {({ getFieldValue }) => {
            const numTypeId = getFieldValue("numTypeId");
            const max = numTypeId == "j" ? 99 : 9
            return (
              <>
              <Form.Item label='Number' name='num' rules={[{ required: true, message: "Field required." }]} extra={`Enter number between 0 and ${max}`}>
                <InputNumber min={0} max={max} />
              </Form.Item>
              </>
            )
          }}
        </Form.Item>

        <Form.Item label='Amount' name='amount' rules={[{ required: true, message: "Field required." }]}>
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
