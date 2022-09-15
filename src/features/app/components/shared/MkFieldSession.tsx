import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { get } from "@muft/dot";
import { useQueryMkSessions } from "src/features/app";

export default function MkFieldSession() {
  const { data, isFetching } = useQueryMkSessions({
    // limit: pageinfo.limit,
    // offset: pageinfo.offset,
    // orderBy: pageinfo.orderBy,
    // filters: filters,
  });
  const items = get(data, "nodes", []);
  return (
    <>
      <Form.Item
        label='Session'
        name='sessionId'
        rules={[{ required: true, message: "Field required." }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder='Select'
          optionFilterProp='children'
        >
          {(items).map((d: any, i: number) => (
            <Select.Option key={i} value={d["id"]}>
              {d["name"]} - {d["id"]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}
