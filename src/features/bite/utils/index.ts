import { PageInfoProps } from "../hooks/useAntdPagination"
import { TFilterInput } from "../domain"

type AntdPagination = {
  current: number;
  pageSize: number;
  total: number;
}

export function antdBuildPageObject(pageinfo: PageInfoProps, total: number): AntdPagination {
  return {
		current: pageinfo.page,
		pageSize: pageinfo.limit,
		total: total,
	}
}

export const antdBuildFiltersRequest = (filters: any, columns: any=[]): TFilterInput[] => {
  let filtersRequest: TFilterInput[] = []
  for (const [key, value] of Object.entries(filters)) {
    if(!value) continue;
    const value1 : any = value
    const column: any = columns.find(function (o: any) { return o.key == key; })
    filtersRequest.push({ 
      "condition": "AND",
      "type": column && column?.type ? column.type : "string",
      "field" : key,
      "value": value1[0],
      "operator": column && column?.condition ? column.condition : "EQUALTO"
    })
    // console.log(`${key}: ${value}`);
  }
  return filtersRequest
}

// kays you have to remove having values included in array 
export const  CLEANER_VALUES = [null, undefined, '']

/*
// 👉️  input _object
  const _object = {
    a: null,
    b: undefined,
    email: 'email@test.com',
    mob:88888888888,
    add:""
  };
  // calling function 
  const __cleandedObject = objectCleaner(_object, CLEANER_VALUES);
  console.log('yup you have cleaned object', __cleandedObject); 
  // 👉️  output { email: "email@test.com",mob: 88888888888 }
*/
// function to clean object pass the raw object and value format you have to clean
export const objectCleaner = (_object: any, _CLEANER_VALUES = CLEANER_VALUES) =>{
  const cleanedObj = {..._object};
  Object.keys(cleanedObj).forEach(key => {
  if (_CLEANER_VALUES.includes(cleanedObj[key])) {
    delete cleanedObj[key];
  }});
  
  return cleanedObj;
}