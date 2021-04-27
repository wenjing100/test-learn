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
          <div>
            <span class="avator-span">修改头像</span>
          </div>
          <div class="imgcon">+</div>
        </div>
      </div>
      <div class="fixname">
        <span class="fixname-span">修改昵称</span><i>&gt;</i>
      </div>
      <div class="relatenumber">
        <span class="relatenumber-span">绑定手机号</span><i>&gt;</i>
      </div>
      <div class="chgaddress">
        <span class="relatenumber-span">修改收货地址</span><i>&gt;</i>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "setpage",
  setup() {
    const router = useRouter();
    const goback = () => {
      router.back();
    };
    return {
      goback,
    };
  },
});
</script>

<style lang='scss' scoped>
.setheader {
  color: #fff;
  font-size: 20px;
}
.setme {
  border-top: 50px solid #eeeeee;
  display: flex;
  flex-direction: column;
  .avator,
  .fixname,
  .relatenumber,
  .chgaddress {
    border-top: 5px solid transparent;
    width: 100%;
    padding: 5px 10px;
  }
  .avator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avator-putimg {
      width: 100%;
      background: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .avator-span{
        color: black;
        padding: 10px 5px;
        font-size: 20px;
        display: inline-block;
      }
      .imgcon {
        width: 100px;
        height: 100px;
        background: #eeeeee;
        border: 1px dashed tomato;
        background-image: url('../../assets/img/头像背景.jpg');
        background-size: contain;
      }
    }
  }
  .fixname,
  .relatenumber,
  .chgaddress {
    height: 60px;
    line-height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 5px solid #cacaca;
    border-top: 3px solid #cacaca;
    font-size: 18px;
    color: black;
    text-shadow: 1px 1px 1px rgb(201, 201, 201);
    span,
    i {
      line-height: 60px;
    }
  }
}
</style>