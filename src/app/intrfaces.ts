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
  numberSale:number
  userPhone:string
  userEmail:string
  dateSale?:number
  summa:number
  salePos:SalePosition[]


}

export interface User{
  userName:string
  userLogin:string
  userRole:number
  passwordHash:string
}
export interface UserData{
  unique_name:[]
  role:string
}
export interface Photo{
  photoId:number
  goodId:number
  photoPath:string
}
