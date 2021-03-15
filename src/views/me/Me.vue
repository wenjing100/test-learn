<template>
  <div class="me">
    <navbar>
      <template v-slot:center>我的档案</template>
    </navbar>
    <h2>Me</h2>
  </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'mePage'
  })
</script>

<style lang='scss' scoped>
.me{
  padding-top: 44px;
}
</style>