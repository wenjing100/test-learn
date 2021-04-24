import { TOKEN_FROM_LOCAL } from '@/store/actionTypes';
import { useStore } from 'vuex'

const store = useStore();

const getToken = ()=>{
    let tk = localStorage.getItem('token');
    if(tk){
        store.commit(TOKEN_FROM_LOCAL, tk);
    }
}

export {
    getToken 
}