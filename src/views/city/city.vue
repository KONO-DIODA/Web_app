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
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <cityGroup v-show="tabActive === key" :groupData="value"/>
      </template>
    </div>
  </div>
</template>

<script setup>

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import useCityStore from "@/stores/modules/city"
import cityGroup from './cpns/city-group.vue'

const router = useRouter()
// 搜索框
const searchValue = ref("")
const cancelClick = () => {
  router.back()
}
// Tab切换
const tabActive = ref()
// 从store获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
// 获取选中标签的数据
// const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>

.city {
  --van-tabs-line-height: 30px;

  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}

</style>