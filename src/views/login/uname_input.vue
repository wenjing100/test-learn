<template>
  <div class="uname">
    <input @input="inputName" @blur="nameBlur" @focus="nf"
      type="text" v-model="uname" placeholder="用户名/手机号/邮箱">
    <span class="status un-status" ref="nametip">
      <i :class="['tipcon','iconfont',{'icon-close-circle':isWrongN,'icon-dui':isCorrectN,'icon-jinggao':isWarnN}]"></i>
      {{nameTips}}
    </span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref} from 'vue'
  export default defineComponent({
      name: 'uname',
      emits:['receiveN'],
      setup(p,{emit}){
        const state = reactive({
          isCorrectN:false,
          isWarnN:true,
          isWrongN:false,
          uname:'',
          nameTips:'用户名不少于6个字符',
        })
        const nametip = ref(null);
        //用户名 聚焦
        const nf = ()=>{
          nametip.value.style.display = 'block';
        }
        //验证输入用户名
        const inputName = ()=>{
          state.uname = state.uname.trim();
          state.isWarnN = true;
          state.isCorrectN = false;
          state.isWrongN = false;
          state.nameTips = '输入用户名...'
        }
        //用户名失焦
        const nameBlur = ()=>{
          nametip.value.style.display = 'none';
          if(state.uname.trim().length > 0){
            nametip.value.style.display = 'block';
            state.isWarnN = false;
            state.isWrongN = false;
            state.isCorrectN = true;
            state.nameTips = ''
            emit('receiveN',state.uname);
          }
        }
        return{
          ...toRefs(state),
          inputName,
          nameBlur,
          nametip,
          nf,
        }
      }
  })
</script>

<style lang='scss' scoped>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2509080_8gfbrq9nbkj.eot?t=1619322941468'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2509080_8gfbrq9nbkj.eot?t=1619322941468#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAO8AAsAAAAACAwAAANwAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDSINBATYCJAMQCwoABCAFhG0HRhsxB8iemjwpsomNxYKwiUC+69wd8fDf2Lf7ZuarplWL/2z10xUSSSXEjZAgdBKUQipkDwm/1GV7oyBWqC7AWCH6ZMc5kEdWmFvG5+m5+ioE1X8NQPB83dqZ97dTF7xNPNBuoMQS/pzYcZK1IOXrr/D/HDNePZ8N869tLhnJo70BjhJoYF1XTRbYdmJ+CsNrXcZpAk0LAmhOswqKwUJhTgrEU1lqAIuMXmnAhrqqWrGyiLcq6ul1OgDwJnj7+AFhkZBUMvNMZ/cztZDyOep1HJr/95tbud/1dFbw68jYAwrxsNJ+G4rie5Cm+jsm9oG6usTnqBcOr+P+/4fwKPK69S+PJGSiyixugxnVZhcmcFgkvjqwCH7EFcnwQcbX0cQrfKGYucoiy412u2NrunPMjncm9/tvTN0auFl7cVF8eVlyfV12ddUOaWnITX+Yi4vKuVtu6IfJfUjX77taeKuKS2dHmetal80N3JxsG7Cyuiq1mpaTFXvvJm9LrOdiYNqUzVUOjv/73M3SynTjA5Pfv8WVPGRwGw8zF5IHqMhD9AbX1wiSDXAhTq627f8r3oqXih29HYsBvys2fv6StTz4+XPzZ/76yZbv//qVv8FrnJ8jKlnluOAlHEjWMBe+/HK+4Fa5LSzbnz9pWAG355LkuLHVok1TzNFgQJsciV8WEP2Vmttru/z5Izs4HtcVJxV5CF7h9BRBssJwIWb6gwLwf46cHBDwFHlrPMn+hQbBg/Ojzjr7hK/1vIBPt9JE+P4TGCb4U4LOgl8q6FhTNJFpKEURO3zdUcxSWRKalokfmWbo+RTKSediQt0kgaRmHrK6NUTB7EFFywyq6g6gaVf2+pYRBonSwI4RAqHvHiRdHyHrO0QUzDOomHoLVf0Amm6G844tGzFZpTPSwIkWN3ZgWaBG0TZxq7C0kEgt+gaWFgX4UsJUOYRDg0LyqWxiJGyKOWqrFMa5iEVGDTiLnI3o9RQrjDYTgQc1ca7EBQeLVS8UJFADWDnBEA04Qgtr1AGTCSgj0WvMWRVevxAhaaHXgDVUVdlLEYxK7h0LFSSkAyJbbuxUdSt3UbWShOE4ESZiKAMsi1gJvRWnMKV6WDNCwAVpGhBVxAmm9cSu8qDllYY33AVN5vOUSJGjREXtsWyUpAaKtC2yjaCnKgkUZCboCQA=') format('woff2'),
  url('//at.alicdn.com/t/font_2509080_8gfbrq9nbkj.woff?t=1619322941468') format('woff'),
  url('//at.alicdn.com/t/font_2509080_8gfbrq9nbkj.ttf?t=1619322941468') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2509080_8gfbrq9nbkj.svg?t=1619322941468#iconfont') format('svg'); /* iOS 4.1- */
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

.icon-dui:before {
  content: "\e636";
  color: #21aa21;
  font-weight: bold;
}

.icon-close-circle:before {
  content: "\eb3a";
  color: red;
  font-weight: bold;
}

.uname,.psword{
  width: 100%;
  position: relative;
  font-size: 18px;
  .status{
    background: rgba(218, 217, 217, 0.3);
    font-size: 12px;
    text-align: center;
    padding: 0 5px  ;
    color:#fff;
    height: 18px;
    line-height: 18px;
    position: absolute;
    top: -20px;
    left: 0;
    border-radius: 5px;
    display: none;
    z-index: 2;
    .tipcon{
      padding: 0 2px;
      font-size: 14px;
      width: 18px;
      height: 18px;
      background: #fff;
      border-radius: 50%;
    }
  }
  input{
    width: 100%;
    height: 45px;
    line-height: 45px;
    outline-color: none;
    border: none;
    border-radius: 2px;
    padding-left: 5px;
    &:focus{
      &~.un-status{
        display: block;
      }
    }
  }
}

</style>