import React, { useState, useEffect } from "react";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { Form, Input, InputNumber, Select, Switch, message } from "antd";
import { ShowWrap, useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import styleAnt from "styles/Ant.module.scss";
import { Role_Agent, Role_Member, Role_Admin } from "src/features/app/domain"
import { mutation_agent_userCreate, mutation_agent_userUpdate, mutation_adm_userCreate, mutation_adm_userUpdate} from "src/features/app";
import { useAuth, useUserRole } from "src/features/auth";

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
    let mutation = mutation_agent_userCreate;
    if(userRole.isAdmin) mutation = mutation_adm_userCreate;

    if (id) {
      mutation = mutation_agent_userUpdate;
      if(userRole.isAdmin) mutation = mutation_adm_userUpdate;
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

        <Form.Item label='Phone' name='phone' rules={[{ required: true, message: "Field required." }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Role' name='roleId' rules={[{ required: true, message: "Field required." }]}>
          <Select
            // showSearch
            style={{ width: "100%" }}
            placeholder='Select User Role'
            optionFilterProp='children'
          >
            {userRole?.isAdmin ? 
              <Select.Option key={Role_Agent} value={Role_Agent}>
                Agent
              </Select.Option>
              : null
            }
            {userRole?.isAgent ? 
              <Select.Option key={Role_Member} value={Role_Member}>
                Member
              </Select.Option>
              : null
            }
          </Select>
        </Form.Item>

        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.roleId !== currentValues.roleId}>
          {({ getFieldValue }) => {
            const roleId = getFieldValue("roleId");
            if(roleId!==Role_Member) return null
            return (
              <>
              <Form.Item label='Min Bet.' name='minBet' rules={[{ required: true, message: "Field required." }]}>
                <InputNumber />
              </Form.Item>
              
              <Form.Item label='Max Bet.' name='maxBet' rules={[{ required: true, message: "Field required." }]} >
                <InputNumber />
              </Form.Item>
              
              <Form.Item label='Rate' name='rate' rules={[{ required: true, message: "Field required." }]} extra="User will pay comm. to the admin let say 10% it means 90-10 ka bhav">
                <InputNumber />
              </Form.Item>

              <Form.Item label='Bet Comm.' name='betComm' rules={[{ required: true, message: "Field required." }]}
              extra="User will receive comm. on betting amount always e.g 2%">
                <InputNumber />
              </Form.Item>

              <Form.Item label='Referral Comm.' name='refComm' rules={[{ required: true, message: "Field required." }]}
              extra="User will referral comm. on totalBetting amount for the users he referred">
                <InputNumber />
              </Form.Item>
              </>
            )
          }}
        </Form.Item>

        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.roleId !== currentValues.roleId}>
          {({ getFieldValue }) => {
            const roleId = getFieldValue("roleId");
            if(roleId!==Role_Agent) return null
            return (
              <>
                <Form.Item label='Patti' name='patti' rules={[{ required: true, message: "Field required." }]}
                extra="User patti with his parent. If patti is 10% then user will be responsible for 10% loss of total amount">
                  <InputNumber />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>

        <Form.Item label='Login Pin' name='loginPin' extra="User can use login pin to login if user does not receives SMS OTP">
          <Input minLength={6} maxLength={6} />
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
