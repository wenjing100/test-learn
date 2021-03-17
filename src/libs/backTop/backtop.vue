<template>
    <div class="bt">
        <span class="iconfont iconjiantou"></span>
    </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'backtop'
  })
</script>

<style lang='scss' scoped>
.bt{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:#fff;
    color: var(--color-high-text);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    span{
        text-align: center;
        line-height: 50px;
        font-size: 40px;
        font-weight: bold;
    }
}
</style>