<template>
  <div>
    <navbar bgcolor="white">
      <template #left>
        <div
          class="iconfont icon-left"
          @click="backclick"
        ></div>
      </template>
      <template #center>
        <span
          v-for="(item, index) of data"
          :key="index"
          :class="['dtitle',{ active: currentIndex === index }]"
          @click="spanclick(index)"
        >
          {{ item }}
        </span>
      </template>
    </navbar>
  </div>
</template>

<script lang='ts'>
import { useRoute, useRouter } from 'vue-router';
import { defineComponent, getCurrentInstance, reactive, ref, toRefs, watch } from "vue";
export default defineComponent({
  name: "detailnavbar",
  props:{
    dpy:{
      type:Array
    }
  },
  setup(p,ctx) {
    const data = ref(["商品", "参数", "评论", "推荐"]);
    const router = useRouter();
    const route = useRoute();
    const instance = getCurrentInstance();
    const state = reactive({
      currentIndex: 0,
      isMousedown:false,
      p_y:p.dpy,
    });

    const spanclick = (index) => {
      state.currentIndex = index;
      // ctx.emit('toElem',index)
      goscroll(index);
    };
    const goscroll = (indx)=>{
      let scrollP = (instance.parent.subTree.children[1] as any).children[0].component.ctx.scrollPosition;
      let refresh = (instance.parent.subTree.children[1] as any).children[0].component.ctx.pull_refresh;
      scrollP(0,-state.p_y[indx],100);
      refresh();
    }
    const changeindex = (index)=>{
      state.currentIndex = index;
    }
    const backclick = () => {
      
      router.back();
    };
    
    return {
      ...toRefs(state),
      data,
      spanclick,
      backclick,
      changeindex
    };
  },
});
</script>

<style lang='scss' scoped>
@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_2430623_zxvct2h3rs.eot?t=1616486160955"); /* IE9 */
  src: url("//at.alicdn.com/t/font_2430623_zxvct2h3rs.eot?t=1616486160955#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKMAAsAAAAABkAAAAJBAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApMYQE2AiQDCAsGAAQgBYRtBy4bhQXILrBt2JMk1cYQIqw77NODATjEw/+vtfv+/NlF3BKHKJpFE5m0qYDHZiWTvYS5/7X2D5NmkXmX0LWIetK6cjez63/f38GaWfVEJpEKhAihET1xw8lLIyVbIP7+uHf6RwEFMh9QjnMu6gLq4kAKdKxBkZVQxg1jF7zA4wRaTBhUOpxf3RBNMntcIBqh74qmglOWWaRJqDUszeJFqSndplc8R9+Pf+vRRFIW7JyTm7mqmPzixBQH1YHrAOEioNUlCqwRMnHRGDxSKxipVkuwzgxxrMzgS1UFanFUhWB/nZ3eBsYg85lYHvtRIwkeq6dewvCkq4leedVFd4fd/v3180FHFW8fH26eetofdiYuXfq6B+VQttdJpbL7b5L9s/SREgged2V3bn41tWbw+VuRPBtmpmknpuBnsAY2ZYNjq1LWWI3tSe9JKlq0oIKtPT6mSvvPHA1N+ieY68YzKDSZQzNxDUqtNqCmyQ60WLWwulUvpVbkZqw4BRC6vEDS4RUKXd7QTHyH0oBPqOmKWmhxFb1btlqIsOVAoctYBW8fworMyNVwS5y5hv524qo8JyJvoSpCD5iaUY4sYIZqiRnFjm8xE5CSKcyD0zBJJORKRlhhLWDOh3Wdmt6kVWQqWhxQkIuhKuDZB0IVUoaCzqyl8vk1yLct4VIdDXXGLUgphP0Dk8YYgC4Is0ENj/JKYYfPwhgBRJFSYB4MQomEBPLmQRFUwTTBBH9umO60oqFCbXtx+ne7oIUtS+EUFnIDiYUAAA==")
      format("woff2"),
    url("//at.alicdn.com/t/font_2430623_zxvct2h3rs.woff?t=1616486160955")
      format("woff"),
    url("//at.alicdn.com/t/font_2430623_zxvct2h3rs.ttf?t=1616486160955")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("//at.alicdn.com/t/font_2430623_zxvct2h3rs.svg?t=1616486160955#iconfont")
      format("svg"); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 10px;
  transition: all .3s;
}

.icon-left:before {
  content: "\e62d";
}
.dtitle{
  margin: 0 3px;
}
.active {
  color: var(--color-high-text);
}
</style>