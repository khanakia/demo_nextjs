import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { useQueryPaymentMethods } from "src/features/app";
export default function FieldPaymentMethod() {

  const { data } = useQueryPaymentMethods();

  const items: [] = data||[]
  return (
    <>
      <Form.Item
        label='Payment Method'
        name='paymentMethodId'
        rules={[{ required: true, message: "Field required." }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder='Select'
          optionFilterProp='children'
        >
          {(items).map((d, i) => (
            <Select.Option key={i} value={d["id"]}>
              {d["name"]} - {d["accNo"]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}
