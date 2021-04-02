<template>
    <div class="par">
        <div class="title"><slot name="ti"></slot></div>
        <div class="content"><slot name="co"></slot></div>
    </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'parmitem'
  })
</script>

<style lang='scss' scoped>
.par{
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid #9b9b9b;
    .title{
        width: 25%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 6px 0 6px 2px;
    }
    .content{
        width: 75%;
        color: var(--color-high-text);
        padding: 6px 5px;
        word-wrap: break-word;
    }
}
</style>