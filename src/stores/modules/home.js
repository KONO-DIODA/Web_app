import { getHomeHouselist } from "@/service/modules/home";

import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    houselist: []
  }),
  actions: {
    async fetchHouselistData(currentPage) {
      const res = await getHomeHouselist(currentPage)
      this.houselist.push(...res.data)
    }
  }
})