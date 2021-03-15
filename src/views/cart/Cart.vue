<template>
  <div class="cart">
    <navbar>
      <template v-slot:center>购物车({{count}})</template>
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
.cart{
  padding-top: 44px;
}
</style>