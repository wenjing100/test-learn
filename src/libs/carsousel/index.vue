<template>
  <div
    class="container"
    @mouseenter="menterHandler"
    @mouseleave="mleaveHandler"
  >
    <div class="inner">
      <car-item v-for="(item, index) in cardata" :key="index">
          <a :href="item.link" target="_blank">
            <img :src="`http://47.110.38.241/${item.image}`" alt="item.title" />
          </a>
      </car-item>
      <director dir="pre" @dirClick="dirClick"></director>
      <director dir="next" @dirClick="dirClick"></director>
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
    hasDirector: {
      type: Boolean,
      default: true,
    },
    dotBgColor: String,
    cardata: {
      type:Array as PropType<IcarData_item[]>,
      default: null,
    },
  },
  setup(props: { ini: number; cardata: IcarData_item[]|null; autoplay: boolean; duration: number; }) {
    const state = reactive({
      currentIndex: props.ini,
      itemLen:props.cardata.length,
    });
    let t = null;
    const autoplay = () => {
      if (props.autoplay) {
        t = setInterval(() => {
          play("next");
        }, props.duration);
      }
    };

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