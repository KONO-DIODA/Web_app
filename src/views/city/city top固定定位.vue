<template>
  <div class="city">
    <div class="top">
      <van-search 
        v-model="searchValue" 
        show-action 
        placeholder="城市/区域/位置" 
        shape="round" 
        @cancel="cancelClick"
      />
      <!-- Tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="item in 100">
        <div>{{ item }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import useCityStore from "@/stores/modules/city"

const router = useRouter()
// 搜索框
const searchValue = ref("")
const cancelClick = () => {
  router.back()
}
// Tab切换
const tabActive = ref()

const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

</script>

<style lang="less" scoped>

.city {
  --van-tabs-line-height: 30px;

  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .content {
    margin-top: 98px;
  }
}

</style>