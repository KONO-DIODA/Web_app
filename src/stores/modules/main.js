import { defineStore } from "pinia";

const startDate = new Date()
const endDate = new Date().setDate(startDate.getDate() + 1)

const useMainStore = defineStore("main", {
  state: () => ({
    startDate: startDate,
    endDate: endDate,
    stayCount: 1,
    isloading: false
  })
})

export default useMainStore