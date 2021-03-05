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
                    val = newval;
                    trigger()
                },delay)
            }
        }
    })
}

export {
    delayVal
}