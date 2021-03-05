<template>
  <div>
    <navbar>
      <template v-slot:center>
        <span>购物街</span>
      </template>
    </navbar>
    <div class="carsou">
      <my-carsousel
        :autoplay="true"
        :duration="3000"
        :hasDot="true"
        :hasDirector="true"
        dotBgColor="#ff5777"
        :cardata="cardata"
      ></my-carsousel>
    </div>
    <h2>Home</h2>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue";
import { IcarData_item } from "../../typings";
import { gethomeMulti } from "../../network/homeNet";
export default defineComponent({
  name: "homePage",
  setup() {
    const state = reactive<{ cardata: IcarData_item[] }>({
      cardata: null,
    });
    onBeforeMount(async () => {
      try {
        let _data = await gethomeMulti();
        state.cardata = _data.data.banner.list;
      } catch (error) {
        console.log("请求数据出错" + error);
      }
    });

    // let cardata = [{link:'',title:'',image:'./src/assets/img/0.jpg'}]
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang='scss' scoped>
.carsou {
  width: 100%;
  height: 150px;
}
</style>