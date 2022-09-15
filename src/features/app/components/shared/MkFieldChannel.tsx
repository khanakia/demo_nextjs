import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { useQueryMkAdmChannels } from "src/features/app";
export default function MkFieldChannel() {

  const { data } = useQueryMkAdmChannels();

  const items: [] = data||[]
  return (
    <>
      <Form.Item
        label='Channel'
        name='channelId'
        rules={[{ required: true, message: "Field required." }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder='Select'
          optionFilterProp='children'
        >
          {(items).map((d, i) => (
            <Select.Option key={i} value={d["id"]}>
              {d["name"]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}
