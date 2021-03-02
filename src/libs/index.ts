
import tabbar from './tabbar/A-tabbar.vue';
import carsousel from './carsousel/index.vue';
import caritem from './carsousel/car-item.vue';
import navbar from './navbar/A-navbar.vue';
import toast from './toast-compnent/index.vue';

const POOL = [
    tabbar,
    carsousel,
    caritem,
    navbar,
    toast
]
    
let wenjingUI = {
    install(Vue){
        POOL.forEach((item)=>{
            Vue.component(item.name,item)
        })
    }
}

export default wenjingUI;
