<template>
  <div
    class="container"
    @mouseenter="menterHandler"
    @mouseleave="mleaveHandler"
  >
    <div class="inner" >
      <car-item v-for="(item, index) in cardata" :key="index">
        <span class="banner">{{item.title}}</span>
        <a :href="item.link">
          <img
          :src="require(`${item.image}`)"
          alt="item.title"
        />
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

<script>
import dots from "./dots";
import director from "./director";
// import cardata from "../../data/carsoulData";
import {
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { IcarData_item } from '../../typings'
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
    cardata:Array
  },
  setup(props) {
    const state = reactive({
      currentIndex: props.ini,
      itemLen: props.cardata.length,
    });
    let t = null;
    const autoplay = () => {
      if (props.autoplay) {
        t = setInterval(() => {
          play("next");
        }, props.duration);
      }
    };

    const play = (dir) => {
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
            state.currentIndex = state.itemLen - 1;
          }
          break;
        default:
          break;
      }
    };
    const dotClick = (index) => {
      state.currentIndex = index;
    };
    const dirClick = (dir) => {
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
      dirClick
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
    transition: all .2s;
    
    .banner{
      width: 100%;
      height: 20px;
      font-size: 14px;
      padding-left: 10px;
      background: rgba(0,0,0,.5);
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
    
  }
  
}
</style>