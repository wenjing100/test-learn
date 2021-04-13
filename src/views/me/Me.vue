<template>
  <div id="me">
    <meheader></meheader>
    <measset></measset>
    <memoreone>
      <meitem>
        <template #icon>
          <i class="iconfont icon-xinxi"></i>
        </template>
        <template #msg> 我的消息 </template>
      </meitem>
      <meitem>
        <template #icon>
          <i class="iconfont icon-jifen"></i>
        </template>
        <template #msg> 积分商城 </template>
      </meitem>
      <meitem>
        <template #icon>
          <i class="iconfont icon-huiyuan"></i>
        </template>
        <template #msg> 会员卡 </template>
      </meitem>
    </memoreone>
    <div class="moretwo">
      <meitem @msgclick="msgclick">
        <template #icon>
          <i class="iconfont icon-gouwuche"></i>
        </template>
        <template #msg> 我的购物车 </template>
      </meitem>
      <meitem>
        <template #icon>
          <i class="iconfont icon-baobao"></i>
        </template>
        <template #msg> 下载购物app </template>
      </meitem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import meheader from "./me-header.vue";
import measset from "./me-assets.vue";
import memoreone from "./me-more-01.vue";
import meitem from "./me-more-item.vue";
import { useRouter } from 'vue-router'
export default defineComponent({
  name: "mePage",
  components: {
    meheader,
    measset,
    memoreone,
    meitem,
  },
  setup(){

    const router = useRouter();
    const msgclick = ()=>{
      router.replace('/cart')
    }
    return{
      msgclick
    }
  }
});
</script>

<style lang='scss' scoped>
#me {
  @font-face {
    font-family: "iconfont";
    src: url("//at.alicdn.com/t/font_2430623_0gsm66h5aw6m.eot?t=1618291142496"); /* IE9 */
    src: url("//at.alicdn.com/t/font_2430623_0gsm66h5aw6m.eot?t=1618291142496#iefix")
        format("embedded-opentype"),
      /* IE6-IE8 */
        url("data:application/x-font-woff2;charset=utf-8;base64,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")
        format("woff2"),
      url("//at.alicdn.com/t/font_2430623_0gsm66h5aw6m.woff?t=1618291142496")
        format("woff"),
      url("//at.alicdn.com/t/font_2430623_0gsm66h5aw6m.ttf?t=1618291142496")
        format("truetype"),
      /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
        url("//at.alicdn.com/t/font_2430623_0gsm66h5aw6m.svg?t=1618291142496#iconfont")
        format("svg"); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-xinxi:before {
    content: "\e635";
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
  color: #fff;
}

</style>