<template>
    <div class="thisweek">
        <span>本周推荐</span>
        <a href="http://47.110.38.241" target="_blank">
            <img :src="`http://47.110.38.241/${thisweek.image}`" alt="">  
        </a>
    </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'thweek',
      props:{
          thisweek:{
              type:Object
          }
      },
  })
</script>

<style lang='scss' scoped>
.thisweek{
    width: 100%;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    img{
        width: 100%;
        min-height: 80px;
    }
}
</style>