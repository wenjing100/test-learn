import { Istate } from '@/typings'

export default <Istate>{
    is_login:false,//记录是否登陆
    userName:'',//记录用户名
    cartData:[],
    isAllchecked:0,//购物车是否全选
    disChecked:0,
    selectNum:0,//购物车选中的数量
    totalPrice:0,//购物车总价
    cat_current:3,//商品默认分类
    viewport_height:812,
    goods_con_position:new Array(3)//主页 goods_con各自滚动的高度
}
    
