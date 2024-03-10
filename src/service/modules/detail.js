import hyRequest from "..";

export function getDetailInfos(houseId) {
  return hyRequest.get({
    url: "/detail/infos",
    params: {
      houseId
    }
  })
}