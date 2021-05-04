import store from '@/store';
import { TOKEN_FROM_LOCAL } from '@/store/actionTypes';
import { SKEY } from '@/hooks/keycode';

const getToken = ()=>{
    let tk = localStorage.getItem('token');
    let un = localStorage.getItem('userName');
    let u = localStorage.getItem('uid');
    let uid = (u as any)^(SKEY as any);
    if(tk){
        store.commit(TOKEN_FROM_LOCAL, {token:tk,un:un,uid});
    }
}
const setToken = ({token,un,uid})=>{
    let u = uid^(SKEY as any);
    localStorage.setItem('token',token);
    localStorage.setItem('userName',un);
    localStorage.setItem('uid',u.toString());
}
const delToken = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('uid');
}
export {
    getToken,
    setToken,
    delToken
}
