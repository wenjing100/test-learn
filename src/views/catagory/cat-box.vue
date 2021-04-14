<template>
  <div class="catbox">
    <div v-for="(item,index) in url" :key="index" class="boxcon">
        <span>{{item.cat_name}}</span>
        <div class="box" :style="{'background-image':item.url}"></div>
    </div> 
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue";
export default defineComponent({
  name: "catbox",
  props:{
    boxlist:{
      type:Array
    }
  },
  setup(props){
    const state = reactive({
      url:[]
    })
    console.log(props.boxlist)
    props.boxlist.forEach(item=>{
      state.url.push({
        url:"url('"+(item as any).pic+"')",
        cat_name:(item as any).cat_name
        })
    })
    return{
      ...toRefs(state)
    }
  }
});
</script>

<style lang='scss' scoped>
.catbox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 20px;
  .boxcon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .box {
    width: 100px;
    height: 100px;
    background-size: contain;
    }
    span{
      display: inline-block;
    }
  }

}
</style>