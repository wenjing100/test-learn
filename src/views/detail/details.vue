<template>
    <div id="gdetails" class="wrapper">
      <detailnavbar></detailnavbar>
      <div v-if="falg">
      <myscroll
        class="content"
        :probtype="3"
      >
        <div class="swiper">
          <my-carsousel
            :autoplay="true"
            :duration="3000"
            :hasDot="true"
            :hasDirector="false"
            dotBgColor="#ff5777"
            :cardata="swiper"
          ></my-carsousel>
        </div>
        <detailbrief :briefdata="brief"></detailbrief>
        <shopbrief :sid="sid"></shopbrief>
        <buyercomments :gid="gid"></buyercomments>
        <goodsparams :parms="parmlist"></goodsparams>
      </myscroll>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  onBeforeMount,
  reactive,
  toRefs,
  ref,
  onMounted,
} from "vue";
import { useRoute } from "vue-router";
import { getDetails } from "@/network/goodsDetails";
import detailnavbar from "./detailnavbar.vue";
import { Iscroll } from "@/typings";
export default defineComponent({
  name: "malldetails",
  components: {
    detailnavbar,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      sr: null,
      swiper: [],
      brief: [],
      sid: null,
      gid: null,
      parmlist: [], //color,sizi,params,describe,desimgs
      falg: false,
    });

    onBeforeMount(async () => {
      try {
        let dd = await getDetails(route.params.id as string);

        let d = dd.data[0];
        let topimgs = d.top_imgs.split(",");
        let gname = d.g_name;
        //brief[gname,price,marketprice,likes,grand_total]
        state.brief.push(
          d.g_name,
          d.price,
          d.marketprice,
          d.likes,
          d.grand_total
        );
        //形成swiper数据格式
        state.sid = d.shop_id;
        state.gid = d.iid;
        for (let i = 0; i < topimgs.length; i++) {
          state.swiper.push({
            link: "",
            title: gname,
            image: topimgs[i],
          });
        }
        //params参数
        state.parmlist[0] = d.colors;
        state.parmlist[1] = d.sizes;
        state.parmlist[2] = d.params.split(",");
        state.parmlist[3] = d.describe_text;
        state.parmlist[4] = d.describe_imgs.split(",");
        state.falg = true;
      } catch (err) {
        console.log("details请求有问题：" + err);
      }
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang='scss' scoped>
#gdetails {
  position: relative;
  background-color: var(--color-background-light);
  z-index: 12;

  .swiper {
    width: 100%;
    height: 22rem;
    margin-top: 44px;
  }
}
</style>