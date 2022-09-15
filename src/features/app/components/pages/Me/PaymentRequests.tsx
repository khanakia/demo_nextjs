import Link from "next/link";
import { Table } from "antd";
import { get } from "@muft/dot";
import { AntDateColumnRender } from "src/features/bite/components";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest, } from "src/features/bite";
import { useQueryPaymentRequests } from "src/features/app";

function GetColumns(getColumnSearchProps: any) {
  const columns = [
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
      title: "To User",
      dataIndex: "toUserPhone",
      key: "toUserPhone",
    },

    {
      title: "Note",
      dataIndex: "note",
      key: "note",
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
    }
  ];

  return columns;
}

export default function Users() {
  const { getColumnSearchProps } = useAntdColSearchInput();
  const columns = GetColumns(getColumnSearchProps);

  const { handleTableChange, getPageInfo } = useAntdPagination();
  const pageinfo = getPageInfo();

  const filters = antdBuildFiltersRequest(pageinfo.filters, columns);

  const { data, isFetching } = useQueryPaymentRequests({
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
      <div className='mb-4 text-end'>
        <Link href={`/me/withdraw_money`}>
          <a className='btn btn-main btn-sm ms-3'>Withdraw Money</a>
        </Link>
      </div>
      <Table
        className='ktable'
        dataSource={items}
        columns={columns}
        scroll={{ x: "1000px" }}
        size={"small"}
        rowKey='id'
        // loading={isFetching}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}
