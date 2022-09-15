import Link from "next/link";
import { Table } from "antd";
import { get } from "@muft/dot";
import { AntDateColumnRender } from "src/features/bite/components";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest, } from "src/features/bite";
import { useQueryPaymentRequestsByChilds } from "src/features/app";
import {  PaymentProcess_Status_Pending } from "./constant"

function GetColumns(getColumnSearchProps: any) {
  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => {
        // hide edit button if user is member admin cannot create or edit members
        // if(userRole.isAdmin && record?.roleId == Role_Member ) return null
        if(record?.statusId !== PaymentProcess_Status_Pending) return null
        return (
          <span>
            <Link href={`/payment_requests/${record.id}/process`}>
              <a href="#">Process</a>
            </Link>
          </span>
        );
      },
      width: 150,
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: AntDateColumnRender,
      sorter: true,
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      // ...getColumnSearchProps("name"),
      // condition: "LIKE",
    },

    {
      title: "Status",
      dataIndex: "statusId",
      key: "status",
      // render: AntStatusColumnRender,
      sorter: true,
    },

    {
      title: "PaymentMethod",
      dataIndex: "paymentMethodName",
      key: "paymentMethodName",
    },

    {
      title: "User",
      dataIndex: "userPhone",
      key: "userPhone",
    },

    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "PaymentMethodId",
      dataIndex: "paymentMethodId",
      key: "paymentMethodId",
    },

    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },

    {
      title: "Internal Note",
      dataIndex: "internalNote",
      key: "internalNote",
    },
  ];

  return columns;
}

export default function Users() {
  const { getColumnSearchProps } = useAntdColSearchInput();
  const columns = GetColumns(getColumnSearchProps);

  const { handleTableChange, getPageInfo } = useAntdPagination();
  const pageinfo = getPageInfo();

  const filters = antdBuildFiltersRequest(pageinfo.filters, columns);

  const { data, isFetching } = useQueryPaymentRequestsByChilds({
    limit: pageinfo.limit,
    offset: pageinfo.offset,
    orderBy: pageinfo.orderBy,
    filters: filters,
  });
  const items = get(data, "nodes");
  const total = get(data, "total", 0);
  const pagination = antdBuildPageObject(pageinfo, total);

  return (
    <>
      <Table
        className='ktable'
        dataSource={items}
        columns={columns}
        scroll={{ x: "1000px" }}
        size={"small"}
        rowKey='id'
        loading={isFetching}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}
