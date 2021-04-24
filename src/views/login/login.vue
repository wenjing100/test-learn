<template>
    <div id="mm-l">
      <div class="cap">mymall~我喜欢的商城！</div>
      <div class="mmCon">
        <div class="uname">
          <input @input="inputName($event)" type="text" v-model.lazy="uname" placeholder="用户名/手机号/邮箱">
          <span class="status un-status">
            <i :class="['tipcon','iconfont',{'icon-cuo':!isCorrectN && !isWarnN,'icon-dui':isCorrectN,'jinggao':isWarnN && !isCorrectN}]"></i>
            {{nameTips}}
          </span>
        </div>
        <div class="psword">
          <input type="text" v-model="psword" placeholder="请输入密码">
          <span class="status ps-status">
            <i :class="['tipcon','iconfont',{'icon-cuo':!isCorrectP && !isWarnP,'icon-dui':isCorrectP,'jinggao':isWarnP && !isCorrectP}]"></i>
            {{pTips}}
          </span>
          <i :class="['see','iconfont',{'icon-eye':isSee},{'icon-eye1':!isSee}]" @click="eyeClick"></i>
        </div>
        <div class="ckinstal">
          <div class="ck" @click="ckClick">未注册？点我</div>
          <div class="loin" @click="loinClick">登陆</div>
        </div>
      </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs} from 'vue'
  export default defineComponent({
      name: 'mymall-login',
      setup(){
        const state = reactive({
          isSee:false,
          isCorrectN:true,
          isWarnN:false,
          isCorrectP:false,
          isWarnP:false,
          uname:'',
          psword:'',
          coverPsword:'',
          nameTips:'名',
          pTips:'不少于6位',
        })
        const eyeClick = ()=>{
          state.isSee = !state.isSee;
        }
        
        const ckClick = ()=>{
          //点击注册
        }
        const loinClick = ()=>{
          //点击登陆
          console.log(state.uname)  
        }
        const inputName = (e)=>{
          //输入用户名
          console.log(e.target.value)
            
        }
        
        return{
          ...toRefs(state),
          eyeClick,
          ckClick,
          loinClick,
          inputName
        }
      }
  })
</script>

<style lang='scss' scoped>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2430623_s03tpoi2dak.eot?t=1619247715934'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2430623_s03tpoi2dak.eot?t=1619247715934#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAT0AAsAAAAACcwAAASmAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDSAqGTIYFATYCJAMYCw4ABCAFhG0HShutCFGULkqM7MdBbtK6Epe4lHZrtSxrcYsy3uaVY6tFUC1bz+5eeFJyoEJUFD4rskKhyRqFMCgQCmURBiHRRxI2bS5VOX/SQQuIjmfDoK6FJs2wbMe/9KfXd7DNcBAqgN24P1+nvebXnlT2oNAJ9knmnqBgxTuR//9e1UzbFpzXvsXlvsw121JO6VfLBSrQGBMX2TheLpiXqQqyjZ3q0IcJ9JnR1do9PL+CdYVhDvTdxjCH9ZRHqRGH1l6XXFjEk0qbHtIr8Oh/fXzDWqyTVJlx4sn5AcF21/8hnh//H+HMZdCOFwJ3GRmrQCHuSyN3TFhZZfQpvyGxBwxoJaUT6kQ764/0If7/T8pgJMKAaba8/3iyIogasQyAe1Ct6IRsikQnqimzWoMi80GjKHyI627LUY94wDB+iGcGb1W0uDuffrOAsLCIgoQwnKLi9o0F3GzbfM1C+1LtYjyDgTOZBJtNsVgllokMSPIWDEZ03xKGBhfb5oFWs5DeThSEmDV4wxCjjWwSYtVSIpqmtoyprsLUnjDVF36fOJJyxklHAneiiPJhUzE42Tv1iAxB9dUutpWXkkbefgWePpTILEf3fjG+e1p71n7CvF/eN7g4Ld3NwFks2d7Z6X6ZngdOePeA19YuRy0wraKgUF8f27zTbkP0zAiVNPcNyZJ7bAOZ7BXDzrNH/3+lF/XMZumYY+4/f7gd4wkrOUYniMB4jCGhdzYTiM1GME6AwBC/xrTuRxx0AFfFJXQkcOBwArwwb3pWFt0b8+rFPOk+WVlimxfW64n5lIh8ME+RF90bsaMn5u9CTbq6u9W1JllSd9dJt1X0tCmjW+FIQdzoyOjo8xHX+XzUCY3cHolOA9UpnWP06zf3Effxr1/H3om/f6FjdPT7t9CVyRh69AgR4yhLoI4RxjGcCl8vrwoKBjBPbGB6+svnwWAHsM/tcOt7tdgAJroYbkxMTA2tcDysN9kW00jTkyBuXvDlSphy+RIkxFlBp/6ZcnzpP4C3BNi/+ZnamNaXxrE2R4UHhJ9vxbXWmMiXalpehYS1yrdEKrQQkQwfrUrVLMOdK4HxP/oqmWQoqZqhICzIo3a5Y6iaUeWt+SGCalFQly8NDvtqBRUAAMC5RKfIBYBzji6QGwBnDd1CugAAaI3GAgBAOzTDP+fPOI2z+Z8g5vhN+Hp/AW8Lf9ZP/68S/TX/MKvW2r+ituVSUfWGty7y2vaUQG0roRnL1GfS+AMmxnyS2CSIQ6HltYCkMQ1Za5ZZuKtQ6bcOtdYG9FlxdHm/ccKI0sOyNwrCiBUkQ14gG/HOLNwPqEz5h9pIGOhzGls37DcfcXNP3Fwd4eIBo+XSW37dDPovXGjyuST1vvTGSR3zOOoPs/UjVzoZ45T6NoxVPXrhAg+px7k8Z6yEU2e1v1StJoOBL/ugvuUCNu0QzpxyCFp4gCKLlby7udrMff4FJ2jk5qRmTUX1hiNqcftopG/YgnlkKVutuZbda7eCMaU8fZgnWAEdIuTkZoWhqny/lGOpvmWPUmViQNbzbS39+W3FU94CfYy3qCNFjhJV1NFormMZwpyNbdhQE417cIkdHgEAAAA=') format('woff2'),
  url('//at.alicdn.com/t/font_2430623_s03tpoi2dak.woff?t=1619247715934') format('woff'),
  url('//at.alicdn.com/t/font_2430623_s03tpoi2dak.ttf?t=1619247715934') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2430623_s03tpoi2dak.svg?t=1619247715934#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-jinggao:before {
  content: "\e810";
  color: blue;
  font-weight: bold;
}
.icon-cuo:before {
  content: "\e60b";
  color: red;
  font-weight: bold;
}
.icon-dui:before {
  content: "\e636";
  color: #7ebb24;
  font-weight: bold;
}
.icon-eye:before {
  content: "\e802";
}
.icon-eye1:before {
  content: "\e60e";
}
@mixin btn{
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
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
  .cap{
    font-size: 26px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 60px;
    width: 100%;
    text-align: center;
  }
  .mmCon{
    min-width: 300px;
    max-width: 750px;
    max-height: 50%;
    min-height: 230px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 30px 30px;
    background:#fc4d6d;
    border-radius: 10px;
    box-shadow: 1px 1px 10px 1px #fcc6cf;
    .uname,.psword{
      width: 100%;
      position: relative;
      .status{
        background: rgba(218, 217, 217, 0.3);
        font-size: 12px;
        text-align: center;
        padding: 0 5px  ;
        color:#fff;
        height: 16px;
        position: absolute;
        top: -17px;
        left: 0;
        border-radius: 5px;
        display: none;
        z-index: 2;
        .tipcon{
          padding: 0 2px;
          font-size: 14px;
          background: #fff;
        }
      }
      input{
        width: 100%;
        height: 30px;
        outline-color: none;
        border: none;
        border-radius: 2px;
        padding-left: 5px;
      }
    }
    .uname{
      input{
        &:focus{
          &~.un-status{
            display: block;
          }
        }
      }
    }
    .psword{
      input{
        &:focus{
          &~.ps-status{
            display: block;
          }
        }
      }
      .see{
        position: absolute;
        top: 0;
        right: 0;
        height: 30px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
      }
    }
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
  }

}
</style>