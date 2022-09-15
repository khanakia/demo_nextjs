import Link from "next/link";
import { Table, Divider } from "antd";
import { get } from "@muft/dot";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest, } from "src/features/bite";
import { useUserRole, TUserRole } from "src/features/auth";
import { useQueryLedgerBalanceByChilds } from "src/features/app";

function GetColumns(getColumnSearchProps: any, userRole: TUserRole) {
  let columns = [
    {
      title: "UserID",
      dataIndex: "userId",
      key: "userId",
      sorter: true,
      ...getColumnSearchProps("userId"),
    },

    {
      title: "User Phone",
      dataIndex: "userPhone",
      key: "userPhone",
      sorter: true,
      ...getColumnSearchProps("userPhone"),
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  return columns;
}

export default function List() {
  // const { user } = useAuth()
  const userRole = useUserRole();
  // console.log(userRole)

  const { getColumnSearchProps } = useAntdColSearchInput();
  const columns = GetColumns(getColumnSearchProps, userRole);

  const { handleTableChange, getPageInfo } = useAntdPagination();
  const pageinfo = getPageInfo();

  const filters = antdBuildFiltersRequest(pageinfo.filters, columns);

  const { data, isFetching } = useQueryLedgerBalanceByChilds({
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
        className='ktable ws-nowrap'
        dataSource={items}
        columns={columns}
        scroll={{ x: "100%" }}
        size={"small"}
        rowKey='id'
        loading={isFetching}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}
