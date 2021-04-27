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
        <catbox :boxlist="catlistData"></catbox>
        <div class="goodsli" v-show="n !== 1">
            <goodscon :goods_data="glist"></goodscon>
        </div>
      </div>
      </myscroll>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs} from 'vue';
import { fetchCat, fetchCatOne, getSideList } from '@/network/catagoryNet'
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
          
          let ee = await getgoodsList({
            pageSize: 8,
            pageIndex:1,
            sortType:'',
            hotPoint:'',
            cat:21
          });
          dd.data.forEach(item=>{
            state.sidelist.push(item);
          });

          ee.data.forEach(item =>{
            state.glist.push(item);
          });
        })
        const catliclick = (n)=>{
          state.n = state.sidelist[n].id;
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
  max-height: 736px;
  min-height: 568px;
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