import Link from "next/link";
import { Table } from "antd";
import { get } from "@muft/dot";
import { useQueryUsers, useUserRole, TUserRole, } from "src/features/auth";
import { AntDateColumnRender, AntStatusColumnRender, } from "src/features/bite/components";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest, } from "src/features/bite";
import { Role_Agent, Role_Member, Role_Admin } from "src/features/app/domain"

function GetColumns(getColumnSearchProps: any, userRole: TUserRole) {
  let columns = [
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => {
        // hide edit button if user is member admin cannot create or edit members
        if(userRole.isAdmin && record?.roleId == Role_Member ) return null
        return (
          <span>
            <Link href={`/users/${record.id}`}>
              <a>Edit</a>
            </Link>
          </span>
        )
      },
      width: 150,
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
      filterSearch: true,
      ...getColumnSearchProps("phone"),
      condition: "LIKE",
      width: 120,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: AntStatusColumnRender,
      sorter: true,
      width: 100,
    },

    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
      ...getColumnSearchProps("roleId"),
      width: 120,
      sorter: true,
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: AntDateColumnRender,
      sorter: true,
      width: 120,
    },

    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      width: 250,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      ...getColumnSearchProps("name"),
      condition: "LIKE",
    },
  ];

  if (userRole.isAdmin) {
    columns = [
      ...columns,
      ...[
        {
          title: "Patti",
          dataIndex: "patti",
          key: "patti",
        },
      ],
    ];
  }

  if (userRole.isAdmin || userRole.isAgent) {
    columns = [
      ...columns,
      ...[
        {
          title: "Rate",
          dataIndex: "rate",
          key: "rate",
        },

        {
          title: "Bet Comm.",
          dataIndex: "betComm",
          key: "betComm",
        },

        {
          title: "Ref Comm.",
          dataIndex: "refComm",
          key: "refComm",
        },

        {
          title: "Min Bet",
          dataIndex: "minBet",
          key: "minBet",
        },

        {
          title: "Max Bet",
          dataIndex: "maxBet",
          key: "maxBet",
        },

        {
          title: "Parent ID",
          dataIndex: "parentId",
          key: "parentId",
          ...getColumnSearchProps("parentId"),
        },

        {
          title: "Parent Phone",
          dataIndex: "parentPhone",
          key: "parentPhone",
          ...getColumnSearchProps("parentPhone"),
        },

        {
          title: "Ref. ID",
          dataIndex: "referralId",
          key: "referralId",
          ...getColumnSearchProps("referralId"),
        },

        {
          title: "Ref. Phone",
          dataIndex: "referralPhone",
          key: "referralPhone",
          ...getColumnSearchProps("referralPhone"),
        },
      ],
    ];
  }

  return columns;
}

export default function Users() {
  // const { user } = useAuth()
  const userRole = useUserRole();
  // console.log(userRole)

  const { getColumnSearchProps } = useAntdColSearchInput();
  const columns = GetColumns(getColumnSearchProps, userRole);

  const { handleTableChange, getPageInfo } = useAntdPagination();
  const pageinfo = getPageInfo();

  const filters = antdBuildFiltersRequest(pageinfo.filters, columns);

  const { data, isFetching } = useQueryUsers({
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
        <Link href={`/users/create`}>
          <a className='btn btn-main btn-sm'>Add User</a>
        </Link>
      </div>

      <Table
        className='ktable'
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
