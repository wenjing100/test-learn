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
      <myscroll
          :probtype="3"
          class="navscroll"
      >
      <div class="sidenav">
        <div v-for="(item,index) in sidelist" :key="item.id">
          <catli @catliclick="catliclick(item.id)" :index="item.id">{{item.name}}</catli> 
        </div>
      </div>
      </myscroll>
      <myscroll
          :probtype="3"
          class="scroll"
        >
      <div class="catlist">
        <div v-if="n===1">
          <catbox :boxlist="catlistData"></catbox>
        </div>
        <div class="goodsli">
          <goodscon :goods_data="glist"></goodscon>
        </div>
      </div>
      </myscroll>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs} from 'vue';
import { fetchCat, getSideList } from '@/network/catagoryNet'
import { useStore } from 'vuex';
import { CAT_CURRENT } from '@/store/actionTypes';
import catli from './cat-li.vue';
import catbox from './cat-box.vue'
import { getgoodsList } from '@/network/goodsList';
  export default defineComponent({
      name: 'catagoryPage',
      components:{
        catli,
        catbox
      },
      setup(){
        const store = useStore();
        const state = reactive({
          sidelist:[{id:1,name:'正在流行',pid:0,level:0}],
          catlistData:[],
          glist:[],
          n:1
        })
        onBeforeMount(async ()=>{
          let dd = await getSideList();
          let cc = await fetchCat(1,0);
          let ee = await getgoodsList();
          dd.data.forEach(item=>{
            state.sidelist.push(item);
          });
          cc.data.forEach(item =>{
            state.catlistData.push(item);
          });
          ee.data.forEach(item =>{
            state.glist.push(item);
          });
        })
        const catliclick = (n)=>{
          state.n = n;
          store.dispatch(CAT_CURRENT,{id:n,size:15});
        }
        return{
          ...toRefs(state),
          catliclick
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
    .navscroll{
      width: 30%;
     .sidenav{
        height: 100%;
      }     
    }
    .scroll{
      width: 70%;
      .catlist{
        .goodsli{
          width: 100%;
        }
      }
    }
    
  }
}
</style>