<template>
  <div class="pcon" ref="pcon">
    <span class="ptitle">产品参数</span>
    <div class="detext">
      <parmitem v-if="parms[3]">
        <template #ti>产品描述</template>
        <template #co>{{ parms[3] }}</template>
      </parmitem>
      <parmitem>
        <template #ti>颜色</template>
        <template #co>{{ parms[0] }}</template>
      </parmitem>
      <parmitem>
        <template #ti>尺码</template>
        <template #co>{{ parms[1] }}</template>
      </parmitem>
      <div class="more" v-for="(item, index) in moreparm" :key="index">
        <parmitem >
          <template #ti>{{item.title}}</template>
          <template #co>{{item.content}}</template>
        </parmitem>
      </div>
    </div>
		<span class="ptitle">产品细节</span>
		<div class="parmimgs" v-for="(item,index) in parms[4]" :key="index">
			<img :src="item" @load="deimgload(index)" alt="产品描述">
		</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs, onUpdated, nextTick } from "vue";
import parmitem from "./parms___item.vue";
import { useStore } from 'vuex';
import { VH_PARMS } from "@/store/actionTypes";
export default defineComponent({
  name: "goodsparams",
  components: {
    parmitem,
  },
  props: {
    parms: {
      type: Array,
      required: true,
    },
  },
  setup(props,ctx) {
    const pcon = ref(null);
    const store = useStore();
    const state = reactive({
      moreparm: [],
      vH:null
    });
    const deimgload =async (index)=>{
      let l = (props.parms[4] as Array<string>).length;
      if(index == l - 1 ){
        state.vH = pcon.value.offsetTop;
        //传递高度
        store.commit(VH_PARMS,pcon.value.offsetTop);
      }
    }
    onMounted(() => {
      (props.parms[2] as Array<String>).forEach((item) => {
        let title = item.split(":")[1] ? item.split(":")[0] : "";
        let content = item.split(":")[1] ? item.split(":")[1] : "";
				if(content!==""&&content!=="undefined"){
					state.moreparm.push({
						title,
						content,
					});
				}
      });
    });
    return {
      ...toRefs(state),
      pcon,
      deimgload,
    };
  },
});
</script>

<style lang='scss' scoped>
.pcon {
  width: 100%;
  border: 10px solid #e0e0e0e0;
  border-radius: 20px;
  padding: 5px;
  background: #fff;
  border-bottom: 5px;
  font-size: 16px;
  .ptitle {
    width: 100%;
    text-align: center;
    display: inline-block;
    padding: 10px 0;
  }
	.parmimgs{
		width: 100%;
		img{
			width: 100%;
		}
	}
}
</style>