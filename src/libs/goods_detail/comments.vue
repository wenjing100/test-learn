<template>
  <div class="commentcon" ref="commentcon">
    <div class="cbanner">
      <span>用户评价（{{ total.length }}）</span>
      <span v-show="vshow" @click="vroll">
        <i class="iconfont icon-ICON-"></i>收起评论
      </span>
    </div>
    <div class="middle" v-for="(item, index) in comments" :key="index">
      <div class="buyerinfo">
        <div class="buyer">
          <div class="avator">
            <img :src="item.logo" alt="" />
          </div>
          <span class="bname">{{ item.buyer_name }}</span>
        </div>
        <span class="ctime">{{ item.comment_time.split("T")[0] }}</span>
      </div>
      <div class="context">
        <span>{{ item.comments == "" ? "默认好评" : item.comments }}</span>
      </div>
      <div class="extra">
        <span class="parm">{{ item.goods_parms }}</span>
      </div>
    </div>
    <div class="cfooter">
      <span v-if="ismore" @click="bannerclick">更多>></span>
      <span v-else>- 没有更多评论 -</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, onBeforeMount, reactive, toRefs, ref, onUpdated, onMounted } from "vue";
import { useStore } from 'vuex'
import { getComments } from "@/network/goodsDetails";
import { VH_COMMENTS } from "@/store/actionTypes";
export default defineComponent({
  name: "buyercomments",
  props: {
    gid: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const instance = getCurrentInstance();
    const commentcon = ref(null);
    const store = useStore();
    const state = reactive({
      comments: [], //{buyer_id,goods_parms,comments}
      total: [],
      ismore: false,
      vshow: false,
    });
    onMounted(()=>{
      store.commit(VH_COMMENTS,commentcon.value.offsetTop);
    })
    onBeforeMount(async () => {
      try {
        let cc = await getComments(props.gid);
        state.total = cc.data;
        let ll = 0;
        if (state.total.length > 2) {
          state.ismore = true;
          ll = 2
        }else{
          ll = state.total.length;
        }
        for (let i = 0; i < ll; i++) {
          state.comments.push(state.total[i]);
        }
      } catch (err) {
        console.log("comments请求出问题：" + err);
      }
    });
    const bannerclick = () => {
      let clen = state.comments.length;
      let tlen = state.total.length;
      state.vshow = true;
      if (tlen > clen) {
        let a = 0;
        let b = 0;
        if (tlen > clen + 5) {
          a = clen;
          b = 5 + clen;
        } else {
          a = clen;
          b = tlen;
          state.ismore = false;
        }
        for (let k = a; k < b; k++) {
          state.comments.push(state.total[k]);
        }
      } else {
        state.ismore = false;
      }
      store.commit(VH_COMMENTS,commentcon.value.offsetTop);
      (instance.parent as any).ctx.pull_refresh();
    };
    const vroll = () => {
      state.comments.length = 2;
      state.vshow = false;
      state.ismore = true;
      store.commit(VH_COMMENTS,commentcon.value.offsetTop);
      (instance.parent as any).ctx.pull_refresh();
    };
    return {
      ...toRefs(state),
      bannerclick,
      vroll,
      commentcon
    };
  },
});
</script>

<style lang='scss' scoped>
@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_2430623_bmpcc6v2cd7.eot?t=1617357502926"); /* IE9 */
  src: url("//at.alicdn.com/t/font_2430623_bmpcc6v2cd7.eot?t=1617357502926#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALIAAsAAAAABpQAAAJ8AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBIIEqATYCJAMICwYABCAFhG0HLxvPBciuMTaG1k0E6OzIu9shRWjeKj9t1hBw+IiHpzn0/culSApRpVVAqKrLylR1Um3KTLMR2VrLPKBRGf8sXwGQPsgecC4PHV/haHzHV6kK2QrXnuAZAtS9vsXMEAe3swWMlwgiCjbgNPNAKYMNvzwVyZigwyjBWMBjCQ6gB+uXa8+9ErbIGn2ey+ndVUD1fH6ggFLcm8baetQLMN4a0N4YRbJAQk/hcMYr8zaBFsNqMnuT1QnKMmtRID4cS4NyLijLQqZJaKjZmcU3pab0mcZX+P34r0oTSVmwaq6exib0frFzius9+oQQge4vUWARyMRdbfJCTgjsnJZk3jjYV2XwS/2+Q+zVKoS/zipvA4OQ3ZPcVdxqeQIZgxWwNSpGbmu3R79fPw8Odve275mTV/n9+7i2ePiYvVKsnPD37wR2yQKEpnJPgDppucog4PhSv7q4vjfol6DYQlnddMX8wt9YWb/a6WnN4OdWQ3/drJ8bNJ3IFfwwec+GrCstYzq0jLqSKuOXgET0qFneHn9jTf13lw1N+u/R3WgoRaHJJJlZiyi1WkaDJptosWC6v1UvlhO5GfNeCUKXbyQdfqDQ5YfMrF+UBvyjQVcKtHgITmw1nddqTJqQifoLOkYUKscp1ajyQNbN1zirDLkX4tSJYDukYmZKIfEca9K71RFRqDgKcELuI9+PMObIJUMatkjcbcZW96SGEQVQtYsRjSAmpHuBHIZISPmtRbX0+QNiufFpuIVWE70gLOUMj9oaWj3IqS7sRbuXR1J3lg4hFKSwSABNyDTi80VQXD/NRQyiwR4Rj3U17Waqr66xviH4um3QwjKnsCcUyuPhdlMHAA==")
      format("woff2"),
    url("//at.alicdn.com/t/font_2430623_bmpcc6v2cd7.woff?t=1617357502926")
      format("woff"),
    url("//at.alicdn.com/t/font_2430623_bmpcc6v2cd7.ttf?t=1617357502926")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("//at.alicdn.com/t/font_2430623_bmpcc6v2cd7.svg?t=1617357502926#iconfont")
      format("svg"); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-ICON-:before {
  content: "\e664";
}
.commentcon {
  width: 100%;
  border: 10px solid var(--color-background-light);
  border-radius: 20px;
  padding: 5px;
  background: var(--color-background);
  border-bottom: 5px;
  .cbanner {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
    padding: 10px 5px;
    padding-bottom: 10px;
    color: var(--color-text);
    border-bottom: 1px dashed var(--color-background-details);
  }
  .middle {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .buyerinfo {
      height: 3.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .buyer{
        width: 70%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .avator {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .bname {
          color: #000;
          padding-left: 10px;
        }
      }
    }
    .context {
      width: 100%;
      padding: 5px 5px;
    }
    .extra {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin: 10px 0;
      padding-left: 5px;
      span {
        font-size: 10px;
        color: #b6b4b4e0;
      }
    }
  }
  .cfooter {
    display: flex;
    justify-content: center;
    padding: 10px 5px;
    span {
      color: var(--color-text);
      font-size: 18px;
    }
  }
}
</style>