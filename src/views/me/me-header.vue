<template>
  <div id="mehead">
    <div class="nav">
      <span>我的档案</span>
    </div>
    <div class="anti-nav">
      <div class="avator" @click="infoclick">
        <div class="inner"><img src="../../assets/img/未登录.jpg" alt=""></div>
      </div>
      <div class="checkinfo">
        <div class="info" >
          <span class="info-a" @click="infoclick">{{info_a}}</span>
          <span class="info-b"><i class="iconfont icon-shouji"></i>{{info_b}}</span>
        </div>
        <div class="goto" @click="infoclick"><i class="iconfont icon-arrow-right-copy-copy"></i></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { useStore } from "vuex";
import { defineComponent, reactive,toRefs } from "vue";
import router from "@/router";
export default defineComponent({
  name: "meheader",
  setup(){
    const store = useStore();
    const state = reactive({
      info_a:localStorage.getItem('token')?localStorage.getItem('userName'):'登陆/注册',
      info_b:localStorage.getItem('token')?'18*********':'未绑定手机号'
    })

    const infoclick = ()=>{
      if(store.state.is_login){
        router.push('/set')
      }else{
        router.push('/login')
      }
    }
    return{
      ...toRefs(state),
      infoclick
    }
  }
});
</script>

<style lang='scss' scoped>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2430623_y8dfxj9vhh.eot?t=1618283304887'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2430623_y8dfxj9vhh.eot?t=1618283304887#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_2430623_y8dfxj9vhh.woff?t=1618283304887') format('woff'),
  url('//at.alicdn.com/t/font_2430623_y8dfxj9vhh.ttf?t=1618283304887') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2430623_y8dfxj9vhh.svg?t=1618283304887#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-arrow-right-copy-copy:before {
  content: "\e603";
}
.icon-xinxi:before {
  content: "\e635";
}
.icon-shouji:before {
  content: "\e692";
}
.icon-gouwuche:before {
  content: "\e699";
}
.icon-baobao:before {
  content: "\e73d";
}
.icon-jifen:before {
  content: "\e641";
}

.icon-huiyuan:before {
  content: "\e62c";
}

#mehead {
  width: 100%;
  background: var(--color-tint);
  height: 132px;
  z-index: 100;
  .nav{
    height: 44px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      display: inline-block;
      font-size: 22px;
    }
  }
  .anti-nav{
    height: 88px;
    width: 100%;
    display: flex;
    flex-direction: row;
    .avator{
      width: 88px;
      height: 88px;
      padding: 14px;
      .inner{
        height: 60px;
        width: 60px;
        background: #d8d7d7;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .checkinfo{
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 3px 10px 3px 5px;
      .info{
        display: flex;
        flex-direction: column;
        .info-a{
          font-size: 20px;
          margin-bottom: 5px;
        }
      }
      .goto{
        i{
          font-size: 26px;
        }
      }
    }
  }
  
}
</style>