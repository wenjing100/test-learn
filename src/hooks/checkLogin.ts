import { TOKEN_FROM_LOCAL } from '@/store/actionTypes';
import { useStore } from 'vuex'

const store = useStore();

const getToken = ()=>{
    let tk = localStorage.getItem('token');
    let un = localStorage.getItem('userName');
    if(tk){
        store.commit(TOKEN_FROM_LOCAL, {token:tk,un:un});
    }
}
const setToken = ({token,un})=>{
    localStorage.setItem('token',token);
    localStorage.setItem('userName',un);
}
const delToken = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
}
export {
    getToken,
    setToken,
    delToken
}