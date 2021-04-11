<template>
  <div id="me">
    <navbar>
      <template v-slot:center>
        <span class="nav-span">
          我的档案
        </span>
      </template>
    </navbar>
    <div class="gaodu">
      
    </div>
    
  </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'mePage'
  })
</script>

<style lang='scss' scoped>
#me{
  padding-top: 44px;
  .nav-span{
    color: #fff;
  }
  
}
</style>