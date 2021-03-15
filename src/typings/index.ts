interface ItabData_item{
    title:string
    icon:string
    path:string
}

interface IcarData_item{
    link:string
    title:string
    image:string
}

interface Istate{
    carData:IcarData_item []
}

interface IhomeReactive{
    cardata: IcarData_item[]
    recomlist: IcarData_item[]
    flag:boolean
    thweek:Object
}
export{
    ItabData_item,
    IcarData_item,
    Istate,
    IhomeReactive
}