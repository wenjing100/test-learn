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
          ref="right_scroll"
          @pullupload="catagory_pullup"
        >
      <div class="catlist">
        <catbox v-if="n == 1 || n==3"></catbox>
        <div class="goodsli" v-if="n !==1 ">
            <goodscon :goods_data="glist" @carImgload="carImgload" :key="n" ></goodscon>
        </div>
      </div>
      </myscroll>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs, ref, getCurrentInstance} from 'vue';
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
        const right_scroll = ref(null);
        const instance = getCurrentInstance();
        const state = reactive({
          sidelist:[{id:1,name:'正在流行',pid:0,level:0}],
          glist:[],
          n:3
        })
        onBeforeMount(async ()=>{
          let dd = (await getSideList()).data.data;
          let ee = (await getgoodsList({
            pageSize: 8,
            pageIndex:1,
            sortType:'',
            hotPoint:'',
            cat:21
          })).data.data;
          dd.forEach(item=>{
            state.sidelist.push(item);
          });
          ee.forEach(item =>{
            state.glist.push(item);
          });
        })
        //点击左侧导航，右侧更新数据
        const catliclick =async (n)=>{
          state.n = n;
          //请求数据
          state.glist = [];
          let cc = (await fetchCat( n, 20)).data.data;
          cc.forEach(item =>{
            state.glist.push(item);
          });
          //点击左边导航，右侧显示的内容需要 刷新一下betterscroll
          (instance.proxy.$refs.right_scroll as any).pull_refresh();
          store.dispatch(CAT_CURRENT,n);
        }
        //图片加载完毕也刷新
        const carImgload = ()=>{
          right_scroll.value.pull_refresh();
        }
        //上拉的时候刷新一下 scroll
        const catagory_pullup = ()=>{
          right_scroll.value.pull_refresh();
        }
        return{
          ...toRefs(state),
          catliclick,
          carImgload,
          right_scroll,
          catagory_pullup
        }
      }
  })
</script>

<style lang='scss' scoped>
#catagory{
  padding-top: 44px;
  height: 100vh;
  .nav-span{
    color:#fff;
  }
  .catbody{
    display: flex;
    flex-direction: row;
    height: 100%;
    .navscroll{
      width: 30%;
      height: calc(100vh - 93px);
      overflow: hidden;
     .sidenav{
        height: 100%;
      }     
    }
    .scroll{
      width: 70%;
      height: calc(100vh - 93px);
      overflow: hidden;
      .catlist{
        .goodsli{
          width: 100%;
        }
      }
    }
    
  }
}
</style>