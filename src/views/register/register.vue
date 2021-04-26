<template>
  <div id="regi">
    <div class="regicon">
      <span class="title">注册 mymall</span>
      
      <nameinput class="nameinput" @reValue="nameValue" aside_title="注册名" plholder="输入你的昵称">
      </nameinput>
      <nameinput
        class="nameinput"
        @reValue="psValue" aside_title="密码" plholder="输入你的密码"
        :ifPs="true" :minLen="minlength">
      </nameinput>
      
      <button class="sign-in" @click="regiClick">点击注册</button>
      <button class="already-has" @click="gotoLogin">已有账号？去登陆</button>
      <span class="asvisitor" @click="visit">游客身份先去逛逛</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import { defineComponent, reactive, toRefs, ref} from 'vue';
import Toast from '@/libs/toast';
import nameinput from './reg-input.vue'
  export default defineComponent({
      name: 'mallregister',
      components:{
        nameinput
      },
      setup(){
        const router = useRouter();
        const state = reactive({
          minlength:6,
          reName:'',
          ps:''
        })
        //用户名
        const nameValue = (nv)=>{
          state.reName = nv;
        }
        //密码
        const psValue = (pv)=>{
          state.ps = pv;
        }
        //点击注册
        const regiClick = ()=>{
          Toast({
            message:'注册成功~正在跳转',
            delay:1000
          });
          let id = setTimeout(()=>{
            clearTimeout(id);
            id = null;
            //跳转路由到首页
          },1000)
        }
        //点击去登陆页面
        const gotoLogin = ()=>{
          router.replace('/login');
        }
        //点击去首页
        const visit = ()=>{
          router.replace('/')
        }
        return{
          ...toRefs(state),
          nameValue,
          psValue,
          regiClick,
          gotoLogin,
          visit
        }
      }
  })
</script>

<style lang='scss' scoped>
@mixin clk{
  width: 100%;
  height: 35px;
  padding:2px 0;
  border-radius: 8px;
  margin: 5px 0;
  outline:none;
  border: none;
  background: #f3f58d;
  box-shadow: 1px 1px 2px rgb(141, 140, 140);
  &:active{
    box-shadow: 2px 3p 2px 10px #5a5a5a inset;
  }
}
#regi{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 60px;
  background-image: -webkit-linear-gradient(90deg,#6ec0d4 40%,#bff0fc 60%);
  .regicon{
    min-width: 300px;
    max-width: 750px;
    max-height: 60%;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px 10px;
    background:#ff95a8;
    border-radius: 10px;
    .title{
      width: 100%;
      text-align: center;
      font-size: 28px;
      color: #fff;
      padding-bottom: 26px;
    }
    .nameinput{
      border-bottom: 22px solid transparent;
    }
    .already-has{
      @include clk;
    }
    .sign-in{
      @include clk;
      font-weight: bold;
    }
    .asvisitor{
      display: inline-block;
      width: 100%;
      text-align: center;
      text-decoration: underline;
      color:#5f5e5e;
      padding:5px 0;
    }
  }

}
</style>