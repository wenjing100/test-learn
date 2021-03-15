<template>
  <div class="catagory">
    <navbar>
      <template v-slot:center>商品分类</template>
    </navbar>
    <h2>Catagory</h2>
  </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'catagoryPage'
  })
</script>

<style lang='scss' scoped>
.catagory{
  padding-top: 44px;
}
</style>