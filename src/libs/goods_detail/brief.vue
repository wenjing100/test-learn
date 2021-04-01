<template>
    <div class="briefcon">
        <div class="gname">
            <span>{{briefdata[0]}}</span>
        </div>
        <div class="aboutprice">
            <span class="nowprice">￥{{briefdata[1]}}</span>
            <span class="oprice">￥{{briefdata[2]}}</span>
            <span class="tag">活动价</span>
        </div>
        <div class="information">
            <span class="grandsell">销量 {{briefdata[4]}}</span>
            <span class="likes">收藏 {{briefdata[3]}}</span>
            <span class="recom">分享 <i class="iconfont icon-fenxiang"></i></span>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'detailbrief',
      props:{
          briefdata:{
              type:Array,
              default:[]
          }
      }
  })
</script>

<style lang='scss' scoped>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2430623_ppifgzbxfuo.eot?t=1617244569077'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2430623_ppifgzbxfuo.eot?t=1617244569077#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMUAAsAAAAABvAAAALGAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBeIF6ATYCJAMICwYABCAFhG0HMhsiBhHVk7lkPxJs28jpkv5FnqJUrQQR6tB7SXYUOUgFYhoJ9mYu4RSGrQhrHQD7bXsyJS0kLPI69G/9ZGcy9u1/jpkugRrzA80lI3m0N8Bx68Ci8pLsDuQA/Ibp5WsoD+JxCOBoSHtk+Mjx07EY+DgBZP2aVUuwOS8GwxIWwa9ZapDLeFh1RuXAJff78qWrWFB4Gl4yeeWI5Qx+XyhS9OHwMPMNAt58ZoCtAg20BwzI9NroRDTCcBoXNTSFfRUKvC8MQ6NH9vrPQ3x4fhQAWZB7TzzFv9V8BYCBneOAXaM+AUz7yCi3701J+6XZzY5kzHo4orx8VlnZzJKS6YfTpz8oc1FGaemM8nFLDKd614XnCksLyorKi1e/K2t6v3zU29Imd0q2nC1cda6wwY0XPV7Ux43v3GfImccubWbu7dt3Rsqc2TJSkOfMGQkLT2VksydPrzya3b3HbNmxQ2bDFTu2z1ZD6Ljlphk6e9qwDj0YMWdu4fDmm5kFt/EZs7Oy7ZTRozxv9OjJk0eNTk5OT5+W2h5mLR67OAh+MhiA8Jr+r1f+6r+hSbOI7Yti+/+zgQGg5tzUq25EeM2gVwL2hmwCP5bXs8L4Aq5Ql8hFNsW4jBsFsMABIdyZQN1YZfJbJAVL8rvYI2iQgsbSHGmw7cEjoDv4WAaBox2jVgckshWNmEigLScACHFkgyKG56CJIxdpsLXgkcI38IkTDY6ZkrhlANdSvBu2FQWjBvkHr2ox0sBjVHhD+06CsgJHeSFdPgDrtBQTJxakOWZcH7sxGzBUMxzgNEypQqMaUPHkmNs+z6bumyZV8zAyjFAwakD+Aa9qMaY2j6Wfv6F9J0EtZT3mF9LluwdWJpYeyFNaepXdyyvXx24wG8BQzcABzJhEtAKtflBAxRNuRLjtzKia6Sud1pfnr1sHOLhKieivsStXlJ8XxQ4DAAA=') format('woff2'),
  url('//at.alicdn.com/t/font_2430623_ppifgzbxfuo.woff?t=1617244569077') format('woff'),
  url('//at.alicdn.com/t/font_2430623_ppifgzbxfuo.ttf?t=1617244569077') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2430623_ppifgzbxfuo.svg?t=1617244569077#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-fenxiang:before {
  content: "\e6d1";
}
@mixin con{
    width: 100%;
    display: flex;
    flex-direction: row;
}
.briefcon{
    width: 100%;
    border: 10px solid var(--color-background-light);
    border-radius: 20px;
    padding: 5px;
    background: var(--color-background); 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .gname{
        color:#1d1d1d;
        font-size: 18px;
    }
    .aboutprice{
        @include con;
        justify-content: flex-start;
        margin:10px 0;
        height: 44px;
        .nowprice{
            color:var(--color-high-text);
            font-size: 30px;
            line-height: 44px;
        }
        .oprice{
            color: var(--color-background-details);
            text-decoration: line-through;
            margin: 0 2px 0px 10px;
            vertical-align: bottom;
            line-height: 48px;
            font-size: 16px;
        }
        .tag{
            background-color: var(--color-high-text);
            color:#fff;
            font-size: 12px;
            border-radius: 5px;
            height: 17px;
            line-height: 17px;
            width: 46px;
            text-align: center;
        }
    }
    .information{
        @include con;
        justify-content: space-between;
        margin:10px 0;
        span{
            color: var(--color-text-light);
        }
        .recom{
            i{
              font-size: 18px;
            }
        }
    }
}
</style>