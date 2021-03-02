<template>
  <div class="director dleft" v-if="dir === 'next'">
    <a href="javascript:;"
    @click="dirClick(dir)"
    >&gt;</a>
  </div>
  <div class="director dright" v-else-if="dir === 'pre'">
    <a href="javascript:;"
    @click="dirClick(dir)">&lt;</a>
  </div>
</template>

<script>
  export default {
      name: 'director',
      props:{
          dir:String
      },
      setup(props,ctx){
          const dirClick = (dir)=>{
              ctx.emit('dirClick',dir)
          }
          return{
              dirClick
          }
      }
  }
</script>

<style lang="scss" scoped>
    .director{
        position: absolute;
        top: 50%;
        width: 20px;
        height: 30px;
        line-height: 30px;
        margin-top: -15px;
        text-align: center;
        z-index: 2;
        border-radius: 20px;
        background-color: rgba($color: #000000, $alpha: .2);   
    }
    
    .dleft{
        right:  0;
    }
    .dright{
        left: 0;
    }
</style>