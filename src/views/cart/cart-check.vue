<template>
  <div class="check">
    <div
      @click="checkClick"
      :class="[
        'checkbox',
        'iconfont',
        'icon-check',
        { ischecked: checked===1 },
      ]"
    >
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "cartcheck",
  props:{
    itemchecked:{
      type:Number,
    }
  },
  emits:['checkclick'],
  setup(p,{emit}){
    const checked = ref(p.itemchecked);
    const checkClick = ()=>{
      checked.value = checked.value == 1?0:1;
      emit('checkclick',checked.value)
    }
    return {
      checkClick,
      checked
    }
  }
});
</script>

<style lang='scss' scoped>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2430623_93xrszn4j9s.eot?t=1617884209212'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2430623_93xrszn4j9s.eot?t=1617884209212#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKkAAsAAAAABjwAAAJaAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApIYAE2AiQDCAsGAAQgBYRtBy8bhQUR1Ys5sr9CGIerBOeISELWQPVcy9QJxe7Tw3dj5xvwEtpRWP8FMhJagggAAAAAIIJoDZ39vxCAZAXoEHRUVIQCVq0x1RWGhIpwbSWRUIUNOGhIccaB5c01s5urnFAR6lnNAyn0hfSB8xlJCcKINcQET7JcMGWuvXoPOLlsyJGybMiRiocEEPjPQMXjAKiLyl6B+WpWBUM+ce/0T6APMuoB5bgXjTVpUhdQFwdSQHtjFFkJZdwwdoFLeEygVKdxsbw+XkCJtSoQ52WuwVxIkli2WCisOZjESwWKs6cGL8Lvx48kJFOQs+o2z1YO+pmdN9879QlhAjpegBzjSMRubWodgnG50lT0sq/q4LP/vlPs1SbYX2dVloN2KL8nhau81WwGtzVSLVpGTSBqfRt2N++iN5cj18/kP7OLKFP7fHDEmV+4ZZjHP8tflUBQ4+BfVQl8eBxak34eivfhDv6FomdX0lWWI0uqorY/U3uOhlKl+I99tT6NNTecOBeKNYzwFOlIkSvWTyZ2HAXKTKBQsTmUGrN2vEydC4hUglF3AKHaa2QqvUeu2jOZ2I8o0OgXClUHKLUfXlhmMLBSZdJCDs0bS9t33nGJiqpPlN8bzVlVyN+IpzKKcRAVsxvqiOfYMj3yRMSj577FNXiOmqbHgfuKrASFyLAMQ1/3psD2LSjIpIUcmjeWtu+8P1hU6fMnyu+N5paOmuyNeCrHxziIepAbfder415emR55IuLRc9/iGsyjpulxqJ9XkZWgGJEYlqHdy/fVB+sb2687BKVgWbKZPSPHFmRrAA==') format('woff2'),
  url('//at.alicdn.com/t/font_2430623_93xrszn4j9s.woff?t=1617884209212') format('woff'),
  url('//at.alicdn.com/t/font_2430623_93xrszn4j9s.ttf?t=1617884209212') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2430623_93xrszn4j9s.svg?t=1617884209212#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-check:before {
  content: "\e617";
}

.check{
		width: 100%;
		padding-right:0 5px;
    .checkbox{
      width: 20px;
      height: 20px;
      background: #fff;
      color: #fff;
      border: 1px solid gray;
      border-radius: 50%;
    }
    .ischecked{
      border: none;
      background: var(--color-high-text);
      line-height: 20px;
      font-size: 20px;
    }
	}
</style>