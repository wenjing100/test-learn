<template>
    <div id="mm-l">
      <div class="cap">
        <span class="mymall">mymall~我喜欢的商城！</span>
        <span class="test-tip">测试：用户名：vght1c  密码：123456</span>
      </div>
      <div class="mmCon">
        <uname @receiveN="un"></uname>
        <psword @receiveP="psw"></psword>
        <div class="ckinstal">
          <div class="ck" @click="ckClick">未注册？点我</div>
          <div class="loin" @click="loinClick">登陆</div>
        </div>
        <span class="gov" @click="gotov">先逛逛</span>
      </div>
    </div>
</template>

<script lang='ts'>
import { useStore } from 'vuex';
import { defineComponent, reactive, toRefs, ref} from 'vue';
import { useRouter,useRoute } from 'vue-router';
import psword from './psword_input.vue';
import uname from './uname_input.vue';
import toast from '@/libs/toast'
import { LOGIN } from '@/store/actionTypes';
  export default defineComponent({
      name: 'mymall-login',
      components:{
        psword,
        uname
      },
      setup(){
        const router = useRouter();
        const route = useRoute();
        const store = useStore();
        const state = reactive({
         psword:'',
         uname:'',
        })

        const psw = (p)=>{
          state.psword = p;
        }
        const un = (n)=>{
          state.uname = n;
        }
        //点击注册
        const ckClick = ()=>{
          router.replace('/register');
        }
        //点击登陆
        const loinClick = ()=>{
          if(state.psword.trim().length > 5 && state.uname.trim().length >= 1){
            store.dispatch(LOGIN,{un:state.uname,psw:state.psword}).then((code)=>{
              if(code){
                let pth = (route.query.redirect as string) || '/';
                router.replace(pth);
              }
            }).catch(err=>{
              toast({
                message: '用户名或密码错误',
                delay:2000
              })
            });
          }else{
            toast({
              message:'用户名和密码不能为空',
              delay:2000
            })
          }
        }
        //点击去首页
        const gotov = ()=>{
          router.replace('/');
        }
        return{
          ...toRefs(state),
          psw,
          un,
          ckClick,
          loinClick,
          gotov,
        }
      }
  })
</script>

<style lang='scss' scoped>
@mixin btn{
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 1px 1px 2px rgb(141, 140, 140);
  &:active{
    box-shadow: 1px 1px 2px .2px rgb(141, 140, 140) inset;
  }
}
#mm-l{
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: -webkit-linear-gradient(30deg,#8a8a8a 50%,rgb(201, 201, 201) 50%);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 60px;
  font-size: 18px;
  .cap{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
    .mymall{
      font-size: 26px;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
    .test-tip{
      font-size: 16px;
      text-align: center;
    }
  }
  .mmCon{
    min-width: 300px;
    max-width: 750px;
    max-height: 50%;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 30px 30px;
    background:#fc4d6d;
    border-radius: 10px;
    /* box-shadow: 1px 1px 10px 1px #fcc6cf; */
    .ckinstal{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      font-weight: bold;
      .ck{
        @include btn;
        font-weight: normal;
        font-size: 14px;
        color: red;
      }
      .loin{
        @include btn;
      }
    } 
    .gov{
      width: 100%;
      text-decoration: underline;
      text-align: center;
      font-size: inherit;
      color:rgb(63, 62, 62);
    }
  }

}
</style>