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
interface Igoods_list_item{
    id:number
    name:string
    price:number
    marketprice:number
    inventory:string
    img_lg: string
    hotpoint: string,
    goods_link: string
}
interface Igoods_list{
    index:number
    data:Igoods_list_item[]
}
interface IhomeReactive{
    cardata: IcarData_item[]
    recomlist: IcarData_item[]
    flag:boolean
    thweek:Object
    goods_pop:Igoods_list
    goods_new:Igoods_list
    goods_sell:Igoods_list
    goods_con_type:number
    bt_show:boolean
}
interface Iscroll{
    scrollPosition: (x:number,y:number,time:number) => void
}
export{
    ItabData_item,
    IcarData_item,
    Istate,
    IhomeReactive,
    Igoods_list_item,
    Igoods_list,
    Iscroll
}