import { createVNode, nextTick, render } from 'vue';
import toast from './toast.vue';

interface Ioption {
  message:string
  delay?:number
}

export default function Toast ({ message, delay = 2000}:Ioption){
  const vm =  createVNode(toast,{message,delay});
  const container = document.createElement('div');
  render(vm,container);
  document.body.append(container);
  //调用 组件中方法 nextTick 等待组件渲染完成后调用
  nextTick(()=>{
    // @ts-ignore:在nextTick中 ctx已经有了，且存在组件中定义的方法
    vm.component.ctx.open();
    let id = null;
    id = setTimeout(()=>{
      clearTimeout(id);
      id = null;
      // @ts-ignore
      vm.component.ctx.close();
      let k = null;
      setTimeout(()=>{
        clearTimeout(k);
        k = null;
        document.body.removeChild(container);
      },300)
    },delay)
  })
}
