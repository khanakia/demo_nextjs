import { useMemo } from "react";
import { useQueryParams, NumberParam, JsonParam, withDefault } from "next-query-params";
import { TSortOrderInput } from "../domain"
import { ObjectLiteral } from "src/features/bite"
import { objectCleaner } from "src/features/bite"

export type PageInfoProps = {
  page: number,
  limit: number,
  offset: number
  orderBy: TSortOrderInput[]
  filters?: ObjectLiteral
}

export default function useAndPagination() {
  const [query, setQuery] = useQueryParams({
		page: withDefault(NumberParam, 1),
		limit: withDefault(NumberParam, 25),
		orderBy: withDefault(JsonParam, []),
    filters: withDefault(JsonParam, {}),
	});
	const { page, limit, orderBy, filters } = query;

  // const [total, setTotal] = useState(0);

	const getSortOrder = (order: string) => {
		return order == "descend" ? "DESC" : "ASC";
	};

	const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // console.log(filters)
    // remove null values otherwise it will create cubersome url
    const cleanedFilters = objectCleaner(filters);

		let metad: any = {
			limit: pagination.pageSize,
			page: pagination.current,
      filters: cleanedFilters
		};

		if (sorter.field) {
			metad["orderBy"] = [
				{
					key: sorter.field,
					value: getSortOrder(sorter.order),
				},
			];
		}
    // console.log(metad)
		setQuery(metad);
	};

  const getPageInfo = (): PageInfoProps => {
    return { 
      page: page,
      limit: limit,
      offset: page > 1 ? page-1 : 0,
      orderBy: orderBy,
      filters: filters
      // total: total
    }
  }

  // const setTotal_ = (totalCount: number) => {
  //   if(!totalCount || totalCount==total) return
  //   setTotal(totalCount);
  // }

  // console.log(total, page, limit, orderBy)

  // Memomize the values so we can use the same refernce inside useCallback
  // and also it will not rerender the hook so it will prevent going infinte inside useCallback when
  // passed as dependency
  return useMemo(() => {
    return {
      // total,
      // setTotal: setTotal_,
      query,
      setQuery,
      handleTableChange,
      getPageInfo
    };
  }, [page, limit, orderBy, filters]);
}
