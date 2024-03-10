<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houselist" :key="item.data.houseId">
        <HouseItemV3 v-if="item.discoveryContentType === 3" :item-data="item.data" @click="itemClick(item.data)"/>
        <HouseItemV9 v-else-if="item.discoveryContentType === 9" :item-data="item.data"  @click="itemClick(item.data)"/>
      </template>
    </div>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'

import HouseItemV3 from "@/components/houselist-item/houselist-item-v3.vue"
import HouseItemV9 from "@/components/houselist-item/houselist-item-v9.vue"

defineProps({
  houselist: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
const itemClick = (item) => {
  router.push("/detail/" + item.houseId)
}

</script>

<style lang="less" scoped>

.content{
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}

</style>