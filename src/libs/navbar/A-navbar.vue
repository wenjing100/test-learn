<template>
    <div class="navbar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="center"></slot></div>
    </div>
</template>

<script lang='ts'>
  export default {
      name: 'navbar'
  }
</script>

<style lang='scss' scoped>
.navbar{
    width: 100%;
    height: 44px;
    line-height: 44px;
    display: flex;
    .left{
        width: 64px;
        background: red;
    }
    .right{
        width: 64px;
        background: red;
    }
    .center{
        flex: 1;
        background: blue;
    }
}
</style>