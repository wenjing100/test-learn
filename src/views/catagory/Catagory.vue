<template>
  <div id="catagory">
    <navbar>
      <template #center>
        <span class="nav-span">
          商品分类
        </span>
      </template>
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
#catagory{
  padding-top: 44px;
  .nav-span{
    color:#fff;
  }
}
</style>