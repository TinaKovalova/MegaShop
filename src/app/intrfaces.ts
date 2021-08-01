export interface Goods{
  goodId:number
  goodName:string
  goodCount?:number
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

export interface SalePosition{
  salePosId?:number
  saleId?:number
  goodId:number
  countGood:number
  summa:number
  goodName:string
}

export interface Sale{
  saleId:number
  NumberSale:number
  UserPhone:string
  UserEmail:string
  DateSale?:number
  Summa:number
  SalePos:SalePosition[]


}
