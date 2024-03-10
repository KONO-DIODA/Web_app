import hyRequest from "..";

export function getCityAll() {
  return hyRequest.get({
    url: "/city/all"
  })
}