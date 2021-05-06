<template>
  <div class="inputcon">
    <span class="reaside">
      {{aside_title}}
    </span>
    <div class="rename">
      <input 
        @keyup="coverKeyup($event)"
        @blur="psBlur" 
        @focus="pf"
        type="text" 
        v-model="reinput" 
        :placeholder=plholder
      >
      <span class="status ps-status" ref="pstip">
        <i 
        :class="[
          'tipcon',
          'iconfont',
          {'icon-cuo':!isCorrectP && !isWarnP,
          'icon-dui':isCorrectP,
          'icon-jinggao':isWarnP && !isCorrectP}]">
        </i>
        {{pTips}}
      </span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref} from 'vue'
  export default defineComponent({
      name: 'psword',
      emits:['reValue'],
      props:{
        aside_title:{
          type:String,
          default:'重复密码'
        },
        plholder:String,
        minLen:{
          type:Number,
          default:1
        },
        ifPs:{
          type:Boolean,
          default:false
        },
      },
      setup(props,{emit}){
        const state = reactive({
          isCorrectP:false,
          isWarnP:true,
          isWrongP:false,   
          reinput:'',
          p:'',
          l:0,
          pTips:'请输入',
        })
        const pstip = ref(null);
        //聚焦
        const pf = ()=>{
          pstip.value.style.display = 'block';
        }
        //失焦
        const psBlur = ()=>{
          pstip.value.style.display = 'none';
          if(state.p.length > 0){
            pstip.value.style.display = 'block';
            if(props.ifPs){
              if(state.p.length <= 5){
                state.isWarnP = false;  
                state.isWrongP = true;
                state.pTips = '密码过短'
              }else{
                emit('reValue',state.p);
              }
            }else{
              emit('reValue',state.p);
            }
          }
        }
        //输入
        const coverKeyup = (e)=>{
          state.l = state.p.length;
          if(e.key == 'Backspace'){
            state.p = state.l <= 1? '' : state.p.substring(0,state.l - 1);
          }
          if(/\w/g.test(e.key) && e.key.length == 1){
            state.p += e.key;
            state.reinput = state.p;
          }
          test();
        }
        
        //提示检验 函数
        const test = ()=>{
          state.isWarnP = true;
          state.l = state.reinput.trim().length;
          //验证是否是密码
          if(props.ifPs){
            if(state.l > props.minLen){
              state.isCorrectP = true;
              state.isWarnP = false;
              state.isWrongP = false;
              state.pTips = '';
            }else{
              state.isCorrectP = false;
              state.isWrongP = false;
              state.pTips = '输入...';
            }
          }else{
            if(state.l > 0){
              state.isCorrectP = true;
              state.isWarnP = false;
              state.isWrongP = false;
              state.pTips = '';
            }else{
              state.isCorrectP = false;
              state.isWrongP = false;
              state.pTips = '输入...';
            }
          }
          
        }
        return{
          ...toRefs(state),
          pstip,
          psBlur,
          pf,
          coverKeyup
        }
      }
  })
</script>

<style lang='scss' scoped>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2509076_ws6y4cyn4aa.eot?t=1619262564121'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2509076_ws6y4cyn4aa.eot?t=1619262564121#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAUoAAsAAAAACcwAAATbAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDSAqGTIYFATYCJAMYCw4ABCAFhG0HShutCBEVnNPJvsbYGNo1qUxN5pXdgidcJLjApbLTbZ7v7nGr4LegAhIAAAAAIHj+/37fPu+eXxE4ntYlFqVVnjSCUaLDf41AbT/35oOq202YnB+SY422mLz/fiG9NB2C01NqQgK7uflQ3evLzsacH8itQ6xqniKzAK+yGkA4ov7/O8sj6wUepnpZYNcu0OlKR7PjFpr9H4V690nBqFbkMc2WZxR52l1XkuCABwNpdxMfUf0M16/Awv/+/3tVM21bcF77Fpf7MtdsSzmlXy0XqEBjTFxk43i5YF6mKsg2dqpDH4YA3Mgb0wnZiuGgBIVhFvSt96uWQCnlgdaIBU67veRCFmmAPJzMKbMAuPa/Xl5jJiWwYCMYJ05x6HLM+KUvtEjB/xvMdxnQjhcCuMvAALoABZJTGtkCEla6enArv4HFCAAvnLCgz1SfaTzze8G80Pr/gZTBSAi8ppnl/ceDgUKAKEAsXnDHqjbQU7UpWKCnoSmz+oGCAd8MBQXfWrrbcthHPCAA+EH6YPC6ogpz+s3KXq8vNTU4/UH7xq7BtGqiYLJ6c+GmhVe2ud7n37mIY8cyLQQkeYvaVnIzJV2bqibAFEyuq+YLQq3mGobKLTQJQS+KaJpWxmQqTOcJky38PusmTuOEKTw3VeSzh02tqtA29Yg+L7YXbqrKLiWNvNuYp5/FzPJK7xfP3WOFx6uPXr2wn12bRvRarnA44m1jIx36rRenci2dXlu1oTh51TcKqra3s817q/351lHVkub2bgNh/3VnmewVw87jl/99Rjc5ms16846wtapjLKzkiRRCYMwY8jz2HyTndQPjAAJD/BqPzQ8c7O0jp22vzeH/0aE0TLZxoyyMhrbREFn4xo1iWyhtC6HhJaJwGiIKlYUhdgyhUdPFoRmzZhZVrrSks2YMzdyGnjZlnFk4krKgr7ev706v67zT54R6z/RGp8Hi2R8hgHqYzT/hyTsRwRwh0y/0nHbvJ+tlQ4wtS6COEcYOp/Lf58bopCG0c2Tk838T7ICVa5zZfn/TAUx0Mdy4eHFqaOt/xo4ZkE4jTV+JuHkyQi4M5XYIEuKsoFN/p/4z/QcIG8HK/zH09yjOXHBtfFDzat/u9coCd6NMG5/T8VJpVCEZV/DSFUm5Fhtd9p5WHvjNzDcICYLFemM1FVupvV2L9XlhNk+TvcLYyigzLvHLPC4AwH/kGBHgX3KSzAT8Q2biAMBsZw4AmL0M/3P+DC8R/yvUXLuSqgLwtSm33E//w5L+mn+Yldbav6K25ZKqesNrZ+W17SkEYMdgQjOWyW3S4A+YCHslsRiIQwInrwVYcCAHBk5Umcrtgg0e9IEdTvQD3a1j+3KPCNUj4wLaHikQQU9g8XsFI+iZqdwXsIn7A7tgPXBbaPSGHvV8sK4UG2WYnKJPpWLLb0HQv0uuLWJN6n3pIWnj8zg9MZWtb1NFOsYpzZGbMWNklRK3qMdRUQjWKkNKbWJgVq9MTnLZB02kUkJgmCIxQzIocQp5KVFhd3MT5D5/F3FahZjWrKmoHiKq4bePpk2YasHctlSt1lzL7o0jzgxjmD6MKVFCWwiRwqwIVJfvN0RSZsKgR6m2YpKsx20tE/Pbyqe8BXAz3sKeJUZUbGIXB471lXOx9NJWelnre3RKfTs8DQAA') format('woff2'),
  url('//at.alicdn.com/t/font_2509076_ws6y4cyn4aa.woff?t=1619262564121') format('woff'),
  url('//at.alicdn.com/t/font_2509076_ws6y4cyn4aa.ttf?t=1619262564121') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2509076_ws6y4cyn4aa.svg?t=1619262564121#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-jinggao:before {
  content: "\e810";
  color: blue;
  font-weight: bold;
}
.icon-cuo:before {
  content: "\e60b";
  color: red;
  font-weight: bold;
}
.icon-dui:before {
  content: "\e636";
  color: #21aa21;
  font-weight: bold;
}
.icon-eye:before {
  content: "\e802";
}
.icon-eye1:before {
  content: "\e60e";
}
.inputcon{
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  .reaside{
    display: inline-block;
    width: 70px;
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    color:#000;
    padding: 0 5px;
  }
  .rename{
  width: calc(100% - 70px);
  position: relative;
  .status{
    background: rgba(218, 217, 217, 0.3);
    font-size: 12px;
    text-align: center;
    padding: 0 5px  ;
    color:#fff;
    height: 18px;
    line-height: 18px;
    position: absolute;
    top: -20px;
    left: 0;
    border-radius: 5px;
    display: none;
    z-index: 2;
    .tipcon{
      padding: 0 2px;
      font-size: 14px;
      width: 18px;
      height: 18px;
      background: #fff;
      border-radius: 50%;
    }
  }
  input{
    width:100%;
    height: 45px;
    line-height: 45px;
    outline-color: none;
    border: none;
    border-radius: 5px;
    padding-left: 5px;
    &:focus{
      &~.ps-status{
        display: block;
      }
    }
  }
  }

}
</style>