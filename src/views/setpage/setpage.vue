<template>
  <div>
  <navbar class="setheader">
    <template #left>
      <span @click="goback">&lt;</span>
    </template>
    <template #center>
      <span>设置</span>
    </template>
  </navbar>
  <div class="setme">
    <div class="avator">
      <div class="avator-putimg">

        <div type="image" class="imgcon">

        </div> 
      </div>
      <div>
        <span class="avator-span">修改头像</span><i>&gt;</i>
      </div>
    </div>
    <div class="fixname">
      <span class="fixname-span">修改昵称</span><i>&gt;</i>
    </div>
    <div class="relatenumber">
      <span class="relatenumber-span">绑定手机号</span><i>&gt;</i>
    </div>
  </div>
  </div>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router'
import { defineComponent} from 'vue'
  export default defineComponent({
    name: 'setpage',
    setup(){
      const router = useRouter();
      const goback = ()=>{
        router.back();
      }
      return{
        goback
      }
    }
  })
</script>

<style lang='scss' scoped>
.setheader{
  color:#fff;
  font-size: 20px;
}
.setme{
  border-top: 50px solid #eeeeee;
  display: flex;
  flex-direction: column;
  .avator,.fixname,.relatenumber{
    border-top:5px solid transparent;
    width: 100%;
    padding: 5px 10px ;
  }
  .avator{
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avator-putimg{
      width: 100%;
      background: #fff;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .imgcon{
        width: 100px;
        height: 100px;
        background: #eeeeee;
        border:1px dashed tomato;
      }
    }
  }
  .fixname,.relatenumber{
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 3px solid #cacaca;
    span,i{
      line-height: 60px;
    }
  }
}
</style>