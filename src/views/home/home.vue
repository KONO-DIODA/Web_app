<template>
  <div class="home" ref="homeRef">
    <HomeNavBar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <HomeSearchBox :hotSuggests="hotSuggests"/>
    <HomeCategories :categories="categories"/>

    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar/>
    </div>

    <HomeContent :houselist="houselist"/>
  </div>
</template>

<script setup>

import { ref, computed, watch, onActivated } from 'vue'

import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import HomeCategories from "./cpns/home-categories.vue"
import HomeContent from "./cpns/home-content.vue"
import hyRequest from "@/service";
import useScroll from "@/hooks/useScroll"
import SearchBar from "@/components/search-bar/search-bar.vue"

// 获取热门建议数据
const hotSuggests = ref([])
hyRequest.get({
  url: "/home/hotSuggests"
}).then(res => {
  hotSuggests.value = res.data
})

// 获取
const categories = ref([])
hyRequest.get({
  url: "/home/categories"
}).then(res => {
  categories.value = res.data
})

// 获取推荐房屋列表
let currentPage =1
const houselist = ref([])
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
const fetchHouselist = (currentPage) => (hyRequest.get({
  url: "/home/houselist",
  params: {
    page: currentPage
  }
}).then(res => {
  houselist.value.push(...res.data)
  isReachBottom.value = false
}))
fetchHouselist(currentPage)

// 监听home的滚动
watch(isReachBottom, (newValue) => {
  if (newValue) {
    currentPage++
    fetchHouselist(currentPage)
  }
})

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350
})

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>

.home {
  padding-bottom: 60px;
  box-sizing: border-box;

  height: 100vh;
  overflow-y: auto;
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}

</style>