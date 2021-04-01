
import tabbar from './tabbar/A-tabbar.vue';
import carsousel from './carsousel/index.vue';
import caritem from './carsousel/car-item.vue';
import navbar from './navbar/A-navbar.vue';
import toast from './toast-compnent/index.vue';
import goodsitem from './goosLists/itemcard.vue';
import goodscon from './goosLists/goodscon.vue';
import myscroll from './scroll/Scroll.vue';
import backtop from './backTop/backtop.vue';
import detailbrief from './goods_detail/brief.vue'

const POOL = [
    tabbar,
    carsousel,
    caritem,
    navbar,
    toast,
    goodsitem,
    goodscon,
    myscroll,
    backtop,
    detailbrief
]
    
let wenjingUI = {
    install(Vue){
        POOL.forEach((item)=>{
            Vue.component(item.name,item)
        })
    }
}

export default wenjingUI;
