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
    iid:string
    g_name:string
    price:number
    marketprice:number
    inventory:number
    top_imgs: string
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
    sb_offsettop:number
    is_fixed:boolean
    stay_position:number
}
interface Iscroll{
    scrollPosition: (x:number,y:number,time:number) => void
    finishpullup: () => void
    pull_refresh: () => void
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