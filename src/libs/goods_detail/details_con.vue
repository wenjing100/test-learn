<template>
    <div class="con">
      <slot></slot>
    </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'detailcon'
  })
</script>

<style lang='scss' scoped>
.con{
    width: 100%;
    border: 10px solid #e0e0e0e0;
    border-radius: 20px;
    padding: 5px;
    background: #fff; 
    border-bottom: 5px;
}
</style>