<template>
  <transition>
      <div class="aaa" v-if="selfIndex===currentIndex">
        <slot></slot>
      </div>
  </transition>
</template>

<script>
  import { 
    getCurrentInstance,
    reactive,
    toRefs,
    watch
    } from 'vue'
  export default {
      name: 'car-item',
      // props:{
      //   currentIndex:{
      //     type:Number
      //   }
      // },
      setup(props){
          const instance = getCurrentInstance();

          const state = reactive({
              selfIndex:instance.vnode.key,
              currentIndex:instance.parent.ctx.currentIndex
          })
          watch(()=>{
            return instance.parent.ctx.currentIndex;
          },(value)=>{
            state.currentIndex = value;
          })

          return {
              ...toRefs(state)
          }
      }
  }
</script>

<style lang="scss" scoped>
.aaa{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
}

.v-enter-active,
.v-leave-active{
  transition: all .5s linear;
}

.v-enter-active{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0);
}

.v-leave-to{
  transform: translateX(-100%);
}


</style>