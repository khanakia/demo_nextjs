import Link from "next/link";
import { Table, Divider } from "antd";
import { get } from "@muft/dot";
import { AntDateTimeColumnRender, AntStatusColumnRender } from "src/features/bite/components";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest, } from "src/features/bite";
import { useUserRole, TUserRole, } from "src/features/auth";
import { useQueryMkAdmTotalBetForEachChild } from "src/features/app";
import { listPageLink, titleSingular, titlePlural } from "./constant"

function GetColumns(getColumnSearchProps: any, userRole: TUserRole) {
  let columns = [
    {
      title: "Channel",
      dataIndex: "channelName",
      key: "channelName",
      sorter: true,
      ...getColumnSearchProps("channelName"),
    },

    {
      title: "SessionID",
      dataIndex: "sessionId",
      key: "sessionId",
      sorter: true,
      ...getColumnSearchProps("sessionId"),
    },

    {
      title: "Session",
      dataIndex: "sessionName",
      key: "sessionName",
      sorter: true,
      ...getColumnSearchProps("sessionName"),
    },

    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: AntDateTimeColumnRender,
      sorter: true,
      width: 120,
    },

    {
      title: "User Phone",
      dataIndex: "userPhone",
      key: "userPhone",
      sorter: true,
      ...getColumnSearchProps("userPhone"),
    },

   

    {
      title: "Total Bet",
      dataIndex: "totalBet",
      key: "totalBet"
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

  const { data, isFetching } = useQueryMkAdmTotalBetForEachChild({
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
