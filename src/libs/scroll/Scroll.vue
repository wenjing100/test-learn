<template>
    <div class="wraper" ref="myscroll" >
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs} from 'vue'
import BScroll from 'better-scroll';
  export default defineComponent({
      name: 'myscroll',
      props:{
          probtype:{
              type:Number,
              default:0
          },
          pullupload:{
              type:Boolean,
              default:false
          }
      },
      setup(props,ctx){
          const myscroll = ref(null)
        //   let bs = ref(null);
        let state = reactive({
            bs:null,
        })
          onMounted(()=>{
            state.bs = new BScroll(myscroll.value,{
              //默认情况bsscroll里面的元素 如div是不可以带点击事件的，要click true才可以
             click:true,
             probeType:props.probtype,
            //  pullUpLoad:props.pullupload
            }) 
            state.bs.on('scroll',(p)=>{
              ctx.emit('scrollmove',p)
            })
          })
          
          const scrollPosition = (x:number, y:number, time:number):void =>{
              state.bs.scrollTo(x,y,time);
          }
          return{
              ...toRefs(state),
              myscroll,
              scrollPosition
          }
      }
  })
</script>

<style lang='scss' scoped>

</style>