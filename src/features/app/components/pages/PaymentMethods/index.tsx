import Link from "next/link";
import { Table } from "antd";
import { get } from "@muft/dot";
import { AntDateColumnRender, AntStatusColumnRender } from "src/features/bite/components";
import { useAntdPagination, antdBuildPageObject, useAntdColSearchInput, antdBuildFiltersRequest } from "src/features/bite";
import { useQueryPaymentMethods } from "src/features/app";

function GetColumns(getColumnSearchProps: any) {
  const columns = [
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <span>
          <Link href={`/payment_methods/${record.id}`}>
            <a>Edit</a>
          </Link>
        </span>
      ),
      width: 150,
    },

  
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      ...getColumnSearchProps("name"),
      condition: "LIKE",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: AntStatusColumnRender,
      sorter: true,
    },

    {
      title: "Acc. No.",
      dataIndex: "accNo",
      key: "accNo",
    },

    {
      title: "Acc. Name",
      dataIndex: "accName",
      key: "accName",
    },

    {
      title: "Bank",
      dataIndex: "bankName",
      key: "bankName",
    },

    {
      title: "Ifsc",
      dataIndex: "ifsc",
      key: "ifsc",
    },
  ];

  return columns;
}

export default function Users() {
  const { getColumnSearchProps } = useAntdColSearchInput();
  const columns = GetColumns(getColumnSearchProps);

  const { data, isFetching } = useQueryPaymentMethods();
  // const items = get(data, "nodes");
  // const total = get(data, "total", 0);
  // const pagination = antdBuildPageObject(pageinfo, total);

  // console.log(data)

  return (
    <>
      <div className='mb-4 text-end'>
        <Link href={`/payment_methods/create`}>
          <a className='btn btn-main btn-sm'>Add New</a>
        </Link>
      </div>

			<Table
				className="ktable"
				dataSource={data}
				columns={columns}
				scroll={{ x: '1000px' }}
				size={"small"}
				rowKey="id"
				loading={isFetching}
			/>
    </>
  );
}
