<template>
  <div class="shopcon">
    <div class="aboutshop">
      <a href="javascript:;" class="logo">
        <img :src="shoplogo" :alt="shopname" />
      </a>
      <div class="info">
        <span class="sname">{{ shopname }}</span>
        <span class="like" @click="likeshop"
          ><i :class="['iconfont','icon-shoucang',{'liked':isLiked}]"></i>{{ likes }}</span
        >
      </div>
    </div>
    <div class="digital">
      <div class="total">
        <div class="total-round">
          <span class="num">{{ sells }}</span
          ><span>总销量</span>
        </div>
        <div class="total-round">
          <span class="num">{{ goods }}</span
          ><span>全部宝贝</span>
        </div>
      </div>
      <div class="compare">
        <div class="sss" :class="{ isbetter: isbetter }">
          <span>店铺评分</span>
          <span class="nn">{{ score }}</span>
          <i class="mm" :class="{ hl: isbetter }">{{ hl }}</i>
        </div>
        <div class="sss" :class="{ isbetter: isbetter }">
          <span>相比同行</span>
          <span class="nn">{{ rate }}%</span>
          <i class="mm" :class="{ hl: isbetter }">{{ hl }}</i>
        </div>
      </div>
    </div>
    <div class="gointoshop">
      <button class="btn">进店逛逛</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue";
import { getShopBrief } from "@/network/goodsDetails";
export default defineComponent({
  name: "shopbrief",
  emits:['shopliked'],
  props: {
    sid: {
      type: String,
      required: true,
    },
  },
  setup(props,{emit}) {
    const state = reactive({
      shopname: "",
      shoplogo: null,
      goods: null,
      sells: null,
      likes: null,
      score: null,
      rate: null,
      isbetter: false,
      hl: "",
      isLiked:false
    });
    onBeforeMount(async () => {
      try {
        let dd = await getShopBrief(props.sid);
        let d = dd.data[0];
        state.shopname = d.s_name;
        state.shoplogo = d.s_logo;
        state.goods = d.goods_num;
        state.sells =
          d.total_sells > 1000
            ? (d.total_sells / 10000).toFixed(2) + "万"
            : d.total_sells;
        state.likes = d.likes;
        state.score = d.s_score;
        state.rate = d.compareRate;
        state.isbetter = d.isBetter;
        state.hl = d.isbetter > 0 ? "高" : "低";
      } catch (err) {
        console.log("shop请求出问题了：" + err);
      }
    });
    const likeshop = ()=>{
      state.isLiked = !state.isLiked;
      emit('shopliked',state.isLiked);
    }
    return {
      ...toRefs(state),
      likeshop
    };
  },
});
</script>

<style lang='scss' scoped>
@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_2430623_98aixesccmq.eot?t=1617251680584"); /* IE9 */
  src: url("//at.alicdn.com/t/font_2430623_98aixesccmq.eot?t=1617251680584#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAN4AAsAAAAAB0QAAAMsAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqCTIIjATYCJAMICwYABCAFhG0HMhtLBsiusCnDvcgGu+55hyZjMa12XRFnn0OIh//f79s+990xkTTexJI4RBqehtBoJLOkoeFpIovQyV7Cn88ufwJ5Iu1ekiqprMWHFjN3nnuz89VZgVx9VmLt10v1B4fc5SAWWiZt9QTPUL9hx7TROV3xsIALPKKjMOMiqQD/D66pvxLPA5pbRnAk4MCmA4wukg1kYL5h7CaCB7iaQLV+RTy2dloF4C8DnQJx+4ZZAf4FmdyRHCqF8oaRWTygynQvvcR9/v34by78ScoKIO3wap0OKn99gGFex0qEIujLaeCMo8AsIBOnjbp9XtI3y0t15PM2DBwrOfj1/yntsH88gigHEmtBr057JjpmPGpiAlnW3gLcnTQjaaXMeWGeSf0XiDD7+M62lo/3F3ZcntYjF16+OMDlkbv44jcp9vVRce6+HHodhF5j8NBq6H1fenuJMHjLCLPxvR23HRPCsZi+p1xeuGjFvgE+ENKrCS8PjLDhcWn+jpL6+19CnfTpWlbDVXKzEeHN8HTCVAXXTY2Mhzv38XWI3+2rrb3PPib2rf1o7NnPjk2LB8cbb/03oxnvd+X8LH/g6fe3f3wxXn+0d44RKOR39FAa9riYar67+Gv1ZOXL9Xed/HX6RnZNjX/kzymuzBZMc62afbrh2s7P1gCUfhUrUv//b1y+Ev+7hvkP4Ax+1nWAW0q/MsMMQOVd6oO/TR9YkmMmkKcc0hsNya1JnoRq6KQEmJp9mipqe7VQqNT2goYKfRkUKo2iMm4WytRYgHKVVqHajIbxNVpQXiJXYdppDUKjDUjqXUCh0StUxn2EMu2+QbnG8IJql4IZa4yHtbpzpDCkQ/UotGrEhZGSBYrkbmQ+6FBonsnxEqKG1QlLOFM52IBciC7RxzhkLmUMQ0yJE9Zr6yGHg0A3JTakMc7CmLuC53HTkziNOEGgTRSiYBAdpDoKstIQLphWZwIrn++GmB3koKAdGSNKCUIZrPVDJTimAagGnmtQxqOcYzjErBTDYBBGEU5QvaZBHNBHQO7mZjaIhuFYJnjcKvBGJTyUx20vcP5AqpMDEKeAjQuVd66Tg5riMgMA")
      format("woff2"),
    url("//at.alicdn.com/t/font_2430623_98aixesccmq.woff?t=1617251680584")
      format("woff"),
    url("//at.alicdn.com/t/font_2430623_98aixesccmq.ttf?t=1617251680584")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("//at.alicdn.com/t/font_2430623_98aixesccmq.svg?t=1617251680584#iconfont")
      format("svg"); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-shoucang:before {
  content: "\e6b3";
}

.shopcon {
  width: 100%;
  border: 10px solid var(--color-background-light);
  border-radius: 20px;
  padding: 5px;
  background: var(--color-background);
  border-bottom: 5px;
  padding: 10px;
  .aboutshop {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .logo {
      width: 40px;
      height: 40px;
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2),
        -1px -1px 1px rgba(0, 0, 0, 0.2);
      img {
        width: inherit;
        height: inherit;
      }
    }
    .info {
      .sname {
        margin: 0 20px 0 10px;
        font-size: 18px;
      }
      .liked{
        color:red;
      }
    }
  }
  @mixin inside {
    display: flex;
    flex-direction: row;
    span {
      color: #299b42;
      font-size: 14px;
    }
    .nn {
      margin-left: 5px;
    }
    .mm {
			display: inline-block;
      color: #fff;
      font-size: 14px;
      background: #299b42;
      width: 18px;
      height: 18px;
			font-style: normal;
			text-align: center;
    }
  }
  .digital {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    .total {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      border-right: 1px solid gray;
      padding-right: 10px;
      .total-round {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        margin-right: 8px;
        .num {
          font-size: 18px;
          margin-bottom: 5px;
        }
      }
    }
    .compare {
      margin-left:10px;
      .sss {
				@include inside;
				margin: 10px 0;
				display: flex;
				justify-content: space-between;
      }
    }
  }
  .gointoshop {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    .btn {
      width: 150px;
      height: 33px;
      outline: none;
      border: none;
      color: var(--color-text);
      background: #ebf3f8;
      border-radius: 10px;
    }
  }
}

.isbetter span {
  color: red;
}
.hl {
  background: red;
}
</style>