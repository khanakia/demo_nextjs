import React, { useState, useEffect } from "react";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { Form, Input, DatePicker, message } from "antd";
import { ShowWrap, useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import styleAnt from "styles/Ant.module.scss";
import { mutation_mk_adm_sessionCreate, mutation_mk_adm_sessionUpdate} from "src/features/app";
import { useUserRole } from "src/features/auth";
import MkFieldChannel from "src/features/app/components/shared/MkFieldChannel";
import {  SessionStatus_UnDeclared } from "src/features/app/constant"

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
  // const { user } = useAuth()
  const userRole = useUserRole();

  const submitForm = () => {
    setSaveRedirect(true);
    form.submit();
  };

  const onFinish = (values: any) => {
    // console.log(values)
    // return

    let gqlInput = {};
    let mutation = mutation_mk_adm_sessionCreate;

    if (id) {
      mutation = mutation_mk_adm_sessionUpdate;
      gqlInput = {
        id: id,
        input: values,
      };
    } else {
      gqlInput = {
        input: values,
      };
    }

    spinner?.show ();
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
        <MkFieldChannel />

        <Form.Item label='Name' name='name' rules={[{ required: true, message: "Field required." }]}>
          <Input />
        </Form.Item>

        {/* <Form.Item label='Status' name='status' valuePropName='checked'>
          <Switch />
        </Form.Item> */}

        <Form.Item label='Start Time' name='startTime' rules={[{ required: true, message: "Field required." }]}>
            <DatePicker
						showTime={{ use12Hours:true,  format: 'HH' }}
						format="YYYY-MM-DD h:mm a"  />
        </Form.Item>

        <Form.Item label='End Time' name='endTime' rules={[{ required: true, message: "Field required." }]}>
            <DatePicker
						showTime={{ use12Hours:true,  format: 'HH' }}
						format="YYYY-MM-DD h:mm a"  />
        </Form.Item>
{/* 
        <Form.Item label='Status' name='statusId' rules={[{ required: true, message: "Field required." }]}>
          <Select
            // showSearch
            style={{ width: "100%" }}
            placeholder='Select Status'
            optionFilterProp='children'
          >
            {userRole?.isAdmin ? 
              <Select.Option key={"open"} value={"open"}>
                Open
              </Select.Option>
              : null
            }
            {userRole?.isAgent ? 
              <Select.Option key={"archived"} value={"archived"}>
                Archived
              </Select.Option>
              : null
            }
          </Select>
        </Form.Item> */}

        <ShowWrap show={id as any && data?.statusId==SessionStatus_UnDeclared}>
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
        </ShowWrap>

      </Form>
    </>
  );
}
