<template>
  <div class="main">
    <detailnavbar></detailnavbar>
    <div v-if="falg">
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
    </div>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
    <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  <li>aa</li>
  </div>

</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getDetails } from "@/network/goodsDetails";
import detailnavbar from "./detailnavbar.vue";
export default defineComponent({
  name: "malldetails",
  components: {
    detailnavbar,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      swiper: [],
      brief:[],
      falg: false,
      sid:null
    });

    onBeforeMount(async () => {
      try{
        let dd = await getDetails(route.params.id as string);
        let d = dd.data[0];
        let topimgs = d.top_imgs.split(",");
        let gname = d.g_name;
        //brief[gname,price,marketprice,likes,grand_total]
        state.brief.push(d.g_name,d.price,d.marketprice,d.likes,d.grand_total);
        //形成swiper数据格式
        state.sid = d.shop_id;
        for (let i = 0; i < topimgs.length; i++) {
          state.swiper.push({
            link: "",
            title: gname,
            image: topimgs[i],
          });
        }
        state.falg = true
      console.log(d)
      console.log(state.brief)
      }catch(err){
        console.log('details请求有问题：'+err)
      }
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang='scss' scoped>
.main{
  background: var(--color-background-light);
  .swiper {
    width: 100%;
    height: 22rem;
    margin-top: 44px;
  }
}

</style>