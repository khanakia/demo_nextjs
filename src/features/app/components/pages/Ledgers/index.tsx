import Link from "next/link";
import { Table } from "antd";
import { get } from "@muft/dot";
import { AntDateColumnRender, AntStatusColumnRender } from "src/features/bite/components";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest } from "src/features/bite";
import { useQueryLedgers } from "src/features/app";
import { useAuth, useUserRole, TUserRole } from "src/features/auth";
import LedgerBalance from "./Balance"

function GetColumns(getColumnSearchProps: any, userRole: TUserRole) {
  let columns: any = [
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: AntDateColumnRender,
      sorter: true,
    },

    // {
    //   title: "User Phone",
    //   dataIndex: "userPhone",
    //   key: "userPhone",
    // },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      // ...getColumnSearchProps("name"),
      // condition: "LIKE",
    },

    {
      title: "Game",
      dataIndex: "gameName",
      key: "gameName",
      ...getColumnSearchProps("gameName"),
    },

  

    
  ];

  if (userRole.isAdmin || userRole.isAgent) {
    columns = [
      ...columns,
      ...[
        {
          title: "Ref",
          dataIndex: "ref",
          key: "ref",
          ...getColumnSearchProps("ref"),
        },
    
        {
          title: "RefID",
          dataIndex: "refId",
          key: "refId",
          ...getColumnSearchProps("refId"),
        },
    
        {
          title: "Ref2",
          dataIndex: "ref2",
          key: "ref2",
          ...getColumnSearchProps("ref2"),
        },
    
        {
          title: "Ref2ID",
          dataIndex: "ref2Id",
          key: "ref2Id",
          ...getColumnSearchProps("ref2Id"),
        },
    
        {
          title: "Ref3",
          dataIndex: "ref3",
          key: "ref3",
          ...getColumnSearchProps("ref3"),
        },
    
        {
          title: "Ref3ID",
          dataIndex: "ref3Id",
          key: "ref3Id",
          ...getColumnSearchProps("ref3Id"),
        },

        {
          title: "Id",
          dataIndex: "id",
          key: "id",
          ...getColumnSearchProps("id"),
        },
        {
          title: "Internal Note",
          dataIndex: "internalNote",
          key: "internalNote",
          className: "ws-wrap minw-200"
        },

        {
          title: "Note",
          dataIndex: "note",
          key: "note",          
          className: "ws-wrap minw-200"
        },
      ],
    ];
  }

  if (userRole.isMember) {
    columns = [
      ...columns,
      ...[
        {
          title: "Note",
          dataIndex: "note",
          key: "note",
        },
      ],
    ];
  }

  return columns;
}

export default function Users() {
  const userRole = useUserRole();

  const { getColumnSearchProps } = useAntdColSearchInput();
  const columns = GetColumns(getColumnSearchProps, userRole);

  const { handleTableChange, getPageInfo } = useAntdPagination();
  const pageinfo = getPageInfo();

  const filters = antdBuildFiltersRequest(pageinfo.filters, columns);

  const { data, isFetching } = useQueryLedgers({
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
        <LedgerBalance />
        { userRole.isAdmin || userRole.isAgent ? 
        <Link href={`/ledgers/wallet_transfer`}>
          <a className='btn btn-main btn-sm'>Wallet Transfer</a>
        </Link>
        : null }
      </div>

			<Table
				className="ktable ws-nowrap"
				dataSource={items}
				columns={columns}
				scroll={{ x: '100%' }}
				size={"small"}
				rowKey="id"
				loading={isFetching}
				pagination={pagination}
				onChange={handleTableChange}
			/>
    </>
  );
}
