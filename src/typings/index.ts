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
export{
    ItabData_item,
    IcarData_item,
    Istate
}