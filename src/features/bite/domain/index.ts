export type TSortOrderInput = {
  key: string
  value: string
}

export type TFilterCondition = "AND" | "OR"

export type TFilterOperator = "LIKE" | "EQUALTO"

export type TFilterInput = {
  condition: TFilterCondition
  field: string
  type: string
  operator: TFilterOperator
  value: any
}

export type TDataGrid = {
  orderBy?: TSortOrderInput[]
  limit?: number, 
  offset?: number, 
  filters?: TFilterInput[]
}

export type { ObjectLiteral } from './ObjectLiteral'