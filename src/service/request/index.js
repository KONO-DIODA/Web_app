import axios from "axios";

import { BASE_URL, TIMEOUT } from "./config";
import useMainStore from "@/stores/modules/main";

const mainStore = useMainStore()

class HYRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(res => {
      mainStore.isloading = true
      return res
    }, err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      mainStore.isloading = false
      return res
    }, err => {
      mainStore.isloading = false
      return err
    })
  }

  request(config) {
    // mainStore.isloading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainStore.isloading = false
      }).catch(err => {
        reject(err)
        // mainStore.isloading = false
      })
    })
  }

  get(config) {
    return this.request({...config, method: "get"})
  }

  post(config) {
    return this.request({...config, method: "post"})
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)