import fastclick from './fastclick'

//设置 html font-size 让页面应用自适应 --rem
document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 3.75 + 'px';

window.addEventListener(
  'load',
  () => {
    fastclick.attach(document.body),
      false
  }
);

//手机端 默认事件禁止
document.documentElement.addEventListener('touchmove',
  e=>{
    if(e.touches.length > 1){
      e.preventDefault();
    }
  },
  false
)

//隐藏工具栏
　window.onload = function() {
  setTimeout(function() {
    window.scrollTo(0, 1)
  }, 0);
};