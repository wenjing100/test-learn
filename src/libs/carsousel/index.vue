<template>
  <div
    class="container"
    @mouseenter="menterHandler"
    @mouseleave="mleaveHandler"
  >
    <div class="inner">
      <car-item v-for="(item, index) in cardata" :key="index">
          <a href="#" target="_blank">
            <img :src="`${item.image}`"
              alt="item.title"
              @load="car_img_load"
              @touchstart="startH($event)"
              @touchmove="moveH($event)"
              @touchend="endH($event)"
            />
          </a>
      </car-item>
      <director :hasDirector="hasDirector" dir="pre" @dirClick="dirClick"></director>
      <director :hasDirector="hasDirector" dir="next" @dirClick="dirClick"></director>
      <dots
        :hasDot="hasDot"
        :itemLen="itemLen"
        :currentIndex="currentIndex"
        :dotBgColor="dotBgColor"
        @dotClick="dotClick"
      ></dots>
    </div>
  </div>
</template>

<script lang='ts'>
import dots from "./dots.vue";
import director from "./director.vue";
import { reactive, toRefs, onMounted, onBeforeUnmount, watchEffect, onBeforeMount } from "vue";
import { IcarData_item } from "../../typings";
import { PropType } from "vue";
export default {
  name: "my-carsousel",
  components: {
    dots,
    director,
  },
  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    ini: {
      type: Number,
      default: 0,
    },
    hasDot: {
      type: Boolean,
      default: true,
    },
    hasDirector: Boolean,
    dotBgColor: String,
    cardata: {
      type:Array as PropType<IcarData_item[]>,
      default: null,
    },
  },
  setup(props: { ini: number; cardata: IcarData_item[]|null; autoplay: boolean; duration: number; },ctx) {
    const state = reactive({
      currentIndex: props.ini,
      itemLen:props.cardata.length,
      startX:null,
      moveLength:null,
    });
    let t = null;
    const autoplay = () => {
      if (props.autoplay) {
        t = setInterval(() => {
          play("next");
        }, props.duration);
      }
    };
    const startH = (e)=>{
      let a = e.changedTouches[0];
      state.startX = a.clientX;
      _clearIntervalFn();
    }
    const moveH = (e)=>{
      let moveX = e.changedTouches[0].clientX;
      state.moveLength = moveX-state.startX;
    }
    const endH = (e)=>{
      if(state.moveLength<=0){
        play('next')        
      }else{
        play('pre')
      }
      autoplay();
    }
    let temp = false
    const car_img_load= ()=>{
      if(!temp){
       ctx.emit('car_img_load'); 
      }
      temp = true;
    }
    const play = (dir: string) => {
      switch (dir) {
        case "next":
          state.currentIndex += 1;
          if (state.currentIndex === state.itemLen) {
            state.currentIndex = 0;
          }
          break;
        case "pre":
          state.currentIndex -= 1;
          if (state.currentIndex === -1) {
            state.currentIndex = state.itemLen! - 1;
          }
          break;
        default:
          break;
      }
    };
    const dotClick = (index: number) => {
      state.currentIndex = index;
    };
    const dirClick = (dir: string) => {
      play(dir);
    };
    const menterHandler = () => {
      _clearIntervalFn();
    };
    const mleaveHandler = () => {
      autoplay();
    };
    function _clearIntervalFn() {
      clearInterval(t);
      t = null;
    }
    onMounted(() => {
      autoplay();
    });
    onBeforeUnmount(() => {
      _clearIntervalFn();
    });

    return {
      ...toRefs(state),
      dotClick,
      menterHandler,
      mleaveHandler,
      dirClick,
      car_img_load,
      startH,
      moveH,
      endH,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    transition: all 0.2s;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>