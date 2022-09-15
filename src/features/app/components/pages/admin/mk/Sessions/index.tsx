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
      title: "",
      key: "action",
      render: (text: any, record: any) => {
        // hide edit button if user is member admin cannot create or edit members
        // if(userRole.isAdmin && record?.roleId == Role_Member ) return null
        return (
          <span>
            <Link href={`${listPageLink}/${record.id}`}>
              <a>Edit</a>
            </Link>
            {/* <Divider type="vertical" />
            <Link href={`${listPageLink}/${record.id}/jantri`}>
              <a>Jantri</a>
            </Link> */}
          </span>
        )
      },
      width: 150,
    },

    {
      title: "Channel",
      dataIndex: "channelName",
      key: "channelName",
      sorter: true,
      // filterSearch: true,
      // ...getColumnSearchProps("name"),
      // condition: "LIKE",
      width: 120,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      filterSearch: true,
      ...getColumnSearchProps("name"),
      condition: "LIKE",
      width: 120,
    },

    {
      title: "Status",
      dataIndex: "statusId",
      key: "statusId",
      // render: AntStatusColumnRender,
      sorter: true,
      width: 100,
    },

    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: AntDateColumnRender,
      sorter: true,
      width: 120,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: AntDateColumnRender,
      sorter: true,
      width: 120,
    },

    {
      title: "resultJodi",
      dataIndex: "resultJodi",
      key: "resultJodi"
    },

    {
      title: "resultHarf",
      dataIndex: "resultHarf",
      key: "resultHarf"
    },

    {
      title: "resultAndarHarf",
      dataIndex: "resultAndarHarf",
      key: "resultAndarHarf"
    },

    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      width: 250,
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
      <div className='mb-4 text-end'>
        <Link href={`${listPageLink}/create`}>
          <a className='btn btn-main btn-sm'>Add {titleSingular}</a>
        </Link>
      </div>

      <Table
        className='ktable'
        dataSource={items}
        columns={columns}
        scroll={{ x: "1700px" }}
        size={"small"}
        rowKey='id'
        loading={isFetching}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}
