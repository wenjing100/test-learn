<template>
    <div class="recomm">
        <div class="recoitem"
            v-for="(item,index) in recomlist"
        >
            <a :href="item.link" target="_blank">
                <img :src="item.image" :alt="item.title">
                <span>{{item.title}}</span>
            </a>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent} from 'vue'
  export default defineComponent({
      name: 'recomm',
      props:{
          recomlist:Array
      }
  })
</script>

<style lang='scss' scoped>
.recomm{
    width: 100%;
    min-height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    padding-bottom: 25px;
    margin-top: 10px;
    border-bottom: 10px solid #e0e0e0;
    font-size: 20px;
    .recoitem{
        
        width: 80px;
        min-height: 100px;
        overflow: hidden;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        span{
            display: inline-block;
            padding-top: 10px;
            width: 100%;
            text-align: center;
        }
    }

}
</style>