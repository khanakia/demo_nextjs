import Link from "next/link";
import { Table, Divider } from "antd";
import { get } from "@muft/dot";
import { AntDateColumnRender, AntStatusColumnRender, } from "src/features/bite/components";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest, } from "src/features/bite";
import { useUserRole, TUserRole, } from "src/features/auth";
import { useQueryMkSessionEntries } from "src/features/app";
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
      title: "Session Name",
      dataIndex: "sessionName",
      key: "sessionName",
      sorter: true,
      ...getColumnSearchProps("sessionName"),
    },

    {
      title: "User Phone",
      dataIndex: "userPhone",
      key: "userPhone",
      sorter: true,
      ...getColumnSearchProps("userPhone"),
      
    },

    {
      title: "NumType",
      dataIndex: "numTypeName",
      key: "numTypeName",
      sorter: true,
      ...getColumnSearchProps("numTypeName"),
    },

    {
      title: "Num",
      dataIndex: "num",
      key: "num",
      ...getColumnSearchProps("num"),
    },

    {
      title: "Amount",
      dataIndex: "adminAmount",
      key: "adminAmount"
    },

    {
      title: "Rate",
      dataIndex: "adminRate",
      key: "adminRate"
    },

    {
      title: "Bet Comm.",
      dataIndex: "adminBetComm",
      key: "adminBetComm"
    },

    {
      title: "Win Amount",
      dataIndex: "adminWinAmt",
      key: "adminWinAmt"
    },

    {
      title: "Bet Comm. Amt.",
      dataIndex: "adminBetCommAmt",
      key: "adminBetCommAmt"
    },

    // {
    //   title: "Agent Patti",
    //   dataIndex: "agentPatti",
    //   key: "agentPatti"
    // },

    // {
    //   title: "Admin Patti",
    //   dataIndex: "adminPatti",
    //   key: "adminPatti"
    // },

   
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      // width: 250,
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

  const { data, isFetching } = useQueryMkSessionEntries({
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
        className="ktable ws-nowrap"
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
