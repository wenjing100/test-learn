import { customRef } from 'vue'

function delayVal<T>(val:T,delay:number){
    let id = null
    return customRef((track,trigger)=>{
        return {
            get(){
                track()
                return val
            },
            set(newval:T){
                clearTimeout(id);
                id = null;
                setTimeout(()=>{
                    trigger()
                    val = newval;
                },delay)
            }
        }
    })
}
function debounce(fn:Function,delay:number){
    let id = null;
    id = setTimeout(()=>{
        clearTimeout(id);
        id = null;
        fn();
    },delay)  
}
export {
    delayVal,
    debounce
}