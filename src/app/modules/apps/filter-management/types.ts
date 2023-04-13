
export interface Filter {
  id?: number,
  filterTypeId:number,
  manufactureName: string | undefined,
  partNo: string | undefined,
  price: string | undefined,
  type: string| undefined
}


export interface FilterType {
  id?: number,
  type:string | undefined

}
