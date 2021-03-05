<template>
    <div class="navbar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
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
    justify-content: space-between;
    background: var(--color-tint);
    .left{
        width: 64px;
    }
    .right{
        width: 64px;
    }
    .center{
        
        color:#fff;
        text-align: center;
    }
}
</style>