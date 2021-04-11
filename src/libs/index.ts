
import tabbar from './tabbar/A-tabbar.vue';
import carsousel from './carsousel/index.vue';
import caritem from './carsousel/car-item.vue';
import navbar from './navbar/A-navbar.vue';
import goodsitem from './goosLists/itemcard.vue';
import goodscon from './goosLists/goodscon.vue';
import myscroll from './scroll/Scroll.vue';
import backtop from './backTop/backtop.vue';
import detailbrief from './goods_detail/brief.vue';
import shopbrief from './goods_detail/shop.vue';
import goodsparams from './goods_detail/goodsparams.vue';
import buyercomments from './goods_detail/comments.vue';
import bottomtool from './bottom_tool/index.vue';
import swipDel from './swip-del/index.vue'

const POOL = [
    tabbar,
    carsousel,
    caritem,
    navbar,
    goodsitem,
    goodscon,
    myscroll,
    backtop,
    detailbrief,
    shopbrief,
    goodsparams,
    buyercomments,
    bottomtool,
    swipDel
]
    
let wenjingUI = {
    install(Vue){
        POOL.forEach((item)=>{
            Vue.component(item.name,item)
        })
    }
}

export default wenjingUI;
