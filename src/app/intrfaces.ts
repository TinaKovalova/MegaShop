export interface Goods{
  goodId:string
  goodName:string
  goodCount:number
  price:number
  manufacturerId:number
  categoryId:number
  categoryName?:string
  manufacturerName?:string
}

export interface Category{
  categoryId:number
  categoryName:string
}

export interface Manufacturer{
  manufacturerId:number
  manufacturerName:string
}
