<template>
  <div id="catagory">
    <navbar>
      <template #center>
        <span class="nav-span">
          商品分类
        </span>
      </template>
    </navbar>
    <div class="catbody">
      <div class="sidenav">
        <div v-for="(item,index) in sidelist" :key="item.id">
          <catli>{{item.name}}</catli> 
        </div>
      </div>
      <div class="catlist"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs} from 'vue';
import { getSideList } from '@/network/catagoryNet'
import catli from './cat-li.vue'
  export default defineComponent({
      name: 'catagoryPage',
      components:{
        catli
      },
      setup(){
        const state = reactive({
          sidelist:[]
        })
        onBeforeMount(async ()=>{
          let dd = await getSideList();
          state.sidelist = dd.data;
        })
        return{
          ...toRefs(state)
        }
      }
  })
</script>

<style lang='scss' scoped>
#catagory{
  padding-top: 44px;
  height: 812px;
  .nav-span{
    color:#fff;
  }
  .catbody{
    display: flex;
    flex-direction: row;
    height: 100%;
    .sidenav{
      width: 30%;
      height: 100%;
    }
  }
}
</style>