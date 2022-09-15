import Link from "next/link";
import { Table, Divider } from "antd";
import { get } from "@muft/dot";
import { AntDateColumnRender, AntStatusColumnRender, } from "src/features/bite/components";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest, } from "src/features/bite";
import { useUserRole, TUserRole, } from "src/features/auth";
import { useQueryMkSessions } from "src/features/app";
import { listPageLink, titleSingular, titlePlural } from "./constant"

function GetColumns(getColumnSearchProps: any, userRole: TUserRole) {
  let columns = [
    {
      title: "Channel",
      dataIndex: "channelName",
      key: "channelName",
      sorter: true,
      // filterSearch: true,
      // ...getColumnSearchProps("name"),
      // condition: "LIKE",
      // width: 120,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      filterSearch: true,
      ...getColumnSearchProps("name"),
      condition: "LIKE",
      // width: 120,
    },

    {
      title: "Status",
      dataIndex: "statusId",
      key: "statusId",
      // render: AntStatusColumnRender,
      sorter: true,
      // width: 100,
    },

    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: AntDateColumnRender,
      sorter: true,
      // width: 120,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: AntDateColumnRender,
      sorter: true,
      // width: 120,
    },

    {
      title: "Result - Jodi",
      dataIndex: "resultJodi",
      key: "resultJodi"
    },

    {
      title: "Result - Harf",
      dataIndex: "resultHarf",
      key: "resultHarf"
    },

    {
      title: "Result - Harf Andar",
      dataIndex: "resultAndarHarf",
      key: "resultAndarHarf"
    },

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

  const { data, isFetching } = useQueryMkSessions({
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
        // scroll={{ x: "1700px" }}
        size={"small"}
        rowKey='id'
        loading={isFetching}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}
