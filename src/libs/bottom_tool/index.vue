<template>
  <div class="bottomtool">
    <div class="tool-left">
      <div class="one aa"><i class="iconfont icon-kefu"></i><span>客服</span></div>
      <div class="two aa"><i class="iconfont icon-dianpu"></i><span>店铺</span></div>
      <div class="three aa"><i class="iconfont icon-biaoqiankuozhan_shoucang-208"></i><span>收藏</span></div>
    </div>
    <div class="tool-right">
      <span class="add" @click="addToCart">加入购物车</span>
      <span class="buy">购买</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "bottomtool",
  setup(p,{emit}){
    const addToCart = ()=>{
      emit('addToCart')
    }
    return{
      addToCart
    }
  }
});
</script>

<style lang='scss' scoped>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2430623_jymvuk9nmwq.eot?t=1617514452292'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2430623_jymvuk9nmwq.eot?t=1617514452292#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAXYAAsAAAAACpQAAAWJAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqIQIZtATYCJAMQCwoABCAFhG0HVhvtCFFUbfpkXxTYxlahg0ZQpEq5pw0WNX+cwwX73knWeKjf73f23f0fEUmiUXU6iekmqZCgJEJhOiVb9hIYom01lLHYsVaxiJENRiEsyJEui5HofcJ/U3HVwXFf+pGVAAFviSD5n8DG6T/cz3RR+sFWz2ZzyWgqHOAogQbUfWGRuAMMYTyN8PxctbmCLhNoNi4d4bC2uRu4SbIkUHAn4LOBW0ArM5DQqKgnbMxBwiOgaKzuiXcA8GD9ffwBRo1UaoW88OiihgvKPylfN5KU/ysNGijAa84McRsFC4AkrhKtJ0iOeMGSNielky0DGpWfVHxSPud/3fj/HH8q0kb6l0eoFKJOlrYSflFSFoynMQi++Awq/hq1CrA5vRGdQJwAEM8MP3pITWrYc4Ma44DwoDgPJMvTy0tdMGcKO+RsvKWqv+GgG0L0gbDyYMrZHO12AnP5qUxSPzkCUDoc9eYw26Nc1YMI68Mcauw3yDocdzxt92HCJqfoXJT5cBLQodC2Xcu71TuVO/iaAMLWg0BZPEd0OLo9nE4mSRd0yomw9Kep3uqTgT17HfkiYi2DPI8/jiZpIFXnDge31Jn6AGKpQ/c+oaqfIvqjodYTFm23hzF1kJcqoNtgTThJVbPMSX2e+t3LuyAP1Q7lTo4qUWcLZ+mDmHyZfXcSSx/MMnc+MLRHG9izdafVEtCtsdONlh1HEpm6p3lEpzHEOzSWHFIG9miNjkqphTuYpVcHNHp9E2IzzHqdzhHvwlLdoEpHICzr1dpAoNHwVWGryby9nEojIm5B81ajoTHJQDJi3r7VbNB48mgTsn2rcXB2Zano9IuDfSfefuHtHebhxtND9HKme+zLU1V/XtzxAp/mpbBbm7nJEyoLLFeb90PwxuPaiRGnLyL/RkeefUipAJOZg30vToY3n37hpVhqJev9j0G796VXLm8brCeOrtLWaN9lrLV0nL5+w/pLDAJA8Y+nOgjVzIFK8FkFYA2A6gbnjZf8hnbh+/b7+kcEEPbbX7nLd8jySXy2awD9s3Kya+5GiD38bTuMZLGi/x0afd0UsAFujGOkVcV17F+ZiCpnhvWGTx3C9/lTIshxnGnTFJWenBlZsVyBHCA8YERmeRG84yJjQXFJYMTXD2MjdkvkWjM/894zR44x9oSO5jZblD8nfayEKlf2Oij22JH1q/MzNa4RuxkPf6tkaudwtNv4/MAmn5WEZotk0497QtqZZPeD+ZnTNiRyj0suY6XT2PEZ/JmpoxNj1FIi9iC2U/Mz2W69New9IT+22GxJwIi/U1epPeyRQatQD7QqIFH2WqLexOTJb7ZEv7lSIPmb7wXY5o8rWY69GT+y4ui0xwyjqjc+nMEyU78SuHMn43pdC6vSA0tmgAzAP9J5UqlAiRxCWo9PepUUeOtO8rrN+dyId/GvqJeu5eNVmYPU/4rbtgG4/3gf3o1akWwAyEFJIOsy3xKZ3OY4oKUnruEKzYqB2zNJt7Um5H2Febcqb4hisDcY86BoNIFO/ALUtFiEukY70Gxe3fYWPTAkkU2Y8yyD0Gk/VNq9QNHpLjrxq1DT71uo66xAs+PwP7DFVNdQFYaycZQLj83AAo5UwlMNOGQXdqJ8hYiN+QUWmYlickEAzqTRw4k6VIJiTSyRT/IZOM6DeZhUDNey61CRSArLMOk6lIPTxnFcVoggvKRXonGkYgA5gEGx4VBcsDEzYAIcUhI8ozkOivx+JxSfgggbllH3w8yEwsgJ+odloqEXQNdJJYXqDqVcbhIfA05hHhhPzJcSg9WSGSVSolIwWfK4dVAcOJrxCmGZQgg14hWV0rqXi/dwDzSTD86ookRGTd6iPIULV8CWyBQRY6ZaOuGGhArp7DhWjcjHpQoOW8LPYNDzAQAAAAA=') format('woff2'),
  url('//at.alicdn.com/t/font_2430623_jymvuk9nmwq.woff?t=1617514452292') format('woff'),
  url('//at.alicdn.com/t/font_2430623_jymvuk9nmwq.ttf?t=1617514452292') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2430623_jymvuk9nmwq.svg?t=1617514452292#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-kefu:before {
  content: "\e605";
}
.icon-dianpu:before {
  content: "\e767";
}
.icon-biaoqiankuozhan_shoucang-208:before {
  content: "\eb4a";
}
.bottomtool {
  width: 100%;
  height: 49px;
  z-index: 20;
  display: flex;
  flex-direction: row;
  .tool-left{
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background: #fff;
    .aa{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i{
        font-size: 22px;
        color:var(--color-high-text);
      }
    }
  }
  .tool-right{
    width: 50%;
    span{
      width: 50%;
      display: inline-block;
      height: 100%;
      line-height: 49px;
      text-align: center;
    }
    .add{
      width: 50%;
      background: gold;
      color: #000;
    }
    .buy{
      background: var(--color-high-text);
      color: #fff;
    }
  }
}
</style>