<template>
  <div id="cart">
    <navbar>
      <template v-slot:center>
        <span class="nav-span">
          购物车({{count}})
        </span>
      </template>
    </navbar>
    <h2>Cart</h2>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref} from 'vue'
  export default defineComponent({
      name: 'cartPage',
      setup(){
        const count = ref(0);

        return {
          count
        }
      }
  })
</script>

<style lang='scss' scoped>
#cart{
  padding-top: 44px;
  .nav-span{
    color:#fff;
  }
}
</style>