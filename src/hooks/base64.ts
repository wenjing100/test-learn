import base64 from 'js-base64';

const return_local_uinfo = ()=>{
    let token = localStorage.getItem('token');
    let info =base64.decode(token.split('.')[0]);
    console.log(info)
}

export {
    return_local_uinfo
}