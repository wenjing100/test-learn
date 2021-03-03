<template>
  <navbar>
    <template v-slot:center>购物街</template>
  </navbar>
  <div class="carsou">
    <my-carsousel
      :autoplay="true"
      :duration="5000"
      :hasDot="true"
      :hasDirector="true"
      dotBgColor="#ff5777"
      :cardata="cardata"
    ></my-carsousel>
  </div>

  <h2>Home</h2>
</template>

<script lang='ts'>
import gethomeDate from "../../network/homeNet";
import { defineComponent, onMounted, provide, reactive, toRefs } from "vue";

export default defineComponent({
  name: "homePage",
  setup() {
    const { gethomeMulti } = gethomeDate();
    const state = reactive({
      
    })
    onMounted(()=>{
      gethomeMulti().then(res=>{
        let cardata = res.data.banner.list;
        
        console.log(cardata)
      }).catch(err=>{
        console.log('222')
      })
    })
    
    return {
      ...toRefs(state)
    }
    
  },
});
</script>

<style lang='scss' scoped>

.carsou{
  width: 100%;
  height: 150px;
}
</style>