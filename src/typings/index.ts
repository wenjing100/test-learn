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
//购物车 接口
interface IviewCartItem{
    gid:string
    faceimg:string
    gname:string
    price:number
    num:number
    checked:number
}
//vuex state接口
interface Istate{
    cartData:IviewCartItem []
    isAllchecked:number
    disChecked:number
    selectNum:number
    totalPrice:number
    cat_current:number
    viewport_height:number
    is_login:boolean
    userName:String
    goods_con_position:Array<number>
    detail_heights:{goods:I_vh_goods,parms:I_vh_parms,comments:I_vh_comments,recom:I_vh_recom}
    userid:string
}
interface I_vh_goods{
  vh:number
}
interface I_vh_comments{
  vh:number
}
interface I_vh_recom{
  vh:number
}
interface I_vh_parms{
  vh:number
}
//产品展示接口
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
    cardata: Array<string>
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
    checkinStatus:string
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
    Iscroll,
    IviewCartItem
}