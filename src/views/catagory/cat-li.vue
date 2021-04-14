<template>
  <div class="catli" :class="{active:index===current}" @click="catliclick">
    <span><slot></slot></span>
  </div>
</template>

<script lang='ts'>
import { useStore } from "vuex";
import { defineComponent, reactive, toRefs, watch } from "vue";
export default defineComponent({
  name: "catli",
  emits:['catliclick'],
  props:{
    index:{
      type:Number
    }
  },
  setup(p,{emit}){
    const store = useStore();
    const state = reactive({
      current: 1,
    });
    const catliclick = ()=>{
      emit('catliclick');
    }
    watch(()=>{
      return store.state.cat_current;
    },val=>{
      state.current = val;
    })
    return {
      ...toRefs(state),
      catliclick
    };
  },
});
</script>

<style lang='scss' scoped>
.catli{
  color: #000;
  background:var(--color-background-light);
  span{
    height: 44px;
    line-height: 44px;
    text-align: center;
    width: 100%;
    display: inline-block;
    font-size: 16px;
  }
}
.active{
  color: var(--color-high-text);
  background: #fff;
  border-left: 2px solid red;
}
</style>