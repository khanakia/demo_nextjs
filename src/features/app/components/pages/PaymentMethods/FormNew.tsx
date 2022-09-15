import React, { useState, useEffect } from "react";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { Form, Input, InputNumber, Select, Switch, message } from "antd";
import { ShowWrap, useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import { mutation_p_paymentMethodCreate, mutation_p_paymentMethodUpdate } from "src/features/app";
import styleAnt from "styles/Ant.module.scss";

export const BankAccountTypes_CheckingCurrent = "current";
export const BankAccountTypes_Saving = "saving";

type FormProps = {
  id?: string;
  data?: any;
  onSubmit?: Function;
};

export default function Form1(props: FormProps) {
  const { id, data = {}, onSubmit } = props;
  const [formValues, setFormValues] = useState(data);
  const [form] = Form.useForm();
  const [errors, setErrors] = useState([]);
  const [saveRedirect, setSaveRedirect] = useState(false);
  const spinner = useSpinner();

  const submitForm = () => {
    setSaveRedirect(true);
    form.submit();
  };

  const onFinish = (values: any) => {
    // console.log(values)
    // return

    let gqlInput = {};
    let mutation = mutation_p_paymentMethodCreate;

    if (id) {
      mutation = mutation_p_paymentMethodUpdate;
      gqlInput = {
        id: id,
        input: values,
      };
    } else {
      gqlInput = {
        input: values,
      };
    }

    spinner?.show();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        // console.log(res);
        message.success("Saved successfully.");

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

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
    setErrors(errorInfo.errorFields);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [JSON.stringify(data)]);

  return (
    <>
      <Form
        form={form}
        // {...antFormLayout}
        className={styleAnt.AntForm}
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          colorPrimary: "#ff000",
          noIndex: false,
        }}
      >
        <Form.Item label='Name' name='name' rules={[{ required: true, message: "Name required." }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Status' name='status' valuePropName='checked'>
          <Switch />
        </Form.Item>

        <Form.Item label='Bank Name' name='bankName' rules={[{ required: true, message: "Field required." }]}>
          <Input />
        </Form.Item>

        <Form.Item label="AccountNo" name="accNo" rules={[{ required: true, message: "Field required." }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Account Holder Name' name='accName' rules={[{ required: true, message: "Field required." }]}>
          <Input />
        </Form.Item>

        <Form.Item label='IFSC Code' name='ifsc' rules={[{ required: true, message: "Field required." }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Account Type' name='accTypeId' rules={[{ required: true, message: "Field required." }]}>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder='Select Account Type'
            optionFilterProp='children'
          >
            <Select.Option key={1} value={BankAccountTypes_CheckingCurrent}>
              Checking / Current
            </Select.Option>
            <Select.Option key={2} value={BankAccountTypes_Saving}>
              Saving
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }} className='submitBtnRow'>
          <button type='button' onClick={() => submitForm()} className='me-3 btn btn-main '>
            Save
          </button>
          <ShowWrap show={!!id}>
            <button className='me-3 btn btn-main ' type='submit'>
              Save & Continue
            </button>
          </ShowWrap>
        </Form.Item>
      </Form>
    </>
  );
}
