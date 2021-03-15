<template>
  <div class="home">
    <navbar>
      <template v-slot:center>
        <span>购物街</span>
      </template>
    </navbar>
    <div v-if="flag">
      <div class="carsou">
        <my-carsousel
          :autoplay="true"
          :duration="3000"
          :hasDot="true"
          :hasDirector="true"
          dotBgColor="#ff5777"
          :cardata="cardata"
        ></my-carsousel>
      </div>
      <recommend :recomlist="recomlist"></recommend>
      <thweek :thisweek="thweek"></thweek>
      <sortbar :sortTitle="sortbarData"></sortbar>
    </div>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
    </ul>
    <h2>Home</h2>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue";
import { IhomeReactive } from "../../typings";
import { gethomeMulti } from "../../network/homeNet";
import sortbarData from '../../data/sortbar'
import recommend from '../../components/recommend/Recommend.vue'
import thweek from '../../components/thisweek/Thisweek.vue'
import sortbar from '../../components/sort-bar/SortBar.vue'
export default defineComponent({
  name: "homePage",
  components:{
    recommend,
    thweek,
    sortbar
  },
  setup() {
    const state = reactive<IhomeReactive>({
      cardata: null,
      recomlist:null,
      flag:false,
      thweek:null
    });
    onBeforeMount(async () => {
      try {
        let _data = await gethomeMulti();
        state.cardata = _data.data.banner.list;
        state.recomlist = _data.data.recommend.list;
        state.thweek = _data.data.thisWeek;
        state.flag = true
      } catch (error) {
        console.log("请求数据出错" + error);
      }
    });

    // let cardata = [{link:'',title:'',image:'./src/assets/img/0.jpg'}]
    return {
      ...toRefs(state),
      sortbarData
    };
  },
});
</script>

<style lang='scss' scoped>
.home{
  padding-top: 44px;
}
.carsou {
  width: 100%;
  height: 150px;
}
</style>