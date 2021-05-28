import {request} from "../../AxiosUtils";

let prefix = "/InstallationOrder"

export const submit = (uuid,) => {

  return request({
    url: prefix + "/submit",
    params: {uuid},
  })
}

export const complete = (uuid,) => {

  return request({
    url: prefix + "/complete",
    params: {uuid},

  })
}

export const confirmOrder = (uuid,) => {
  return request({
    url: prefix + "/confirm",
    params: {uuid},

  })
}

export const assignOrder = (param,) => {
  return request({
    url: prefix + "/assign",
    params: param,

  })
}

export const abandon = (param,) => {
  return request({
    url: prefix + "/abandon",
    params: param,

  })
}

export const editInventory = (data,) => {
  return request({
    url: prefix + "/editInventory",
    data,

  })
}

export const findByOrderUuid = (orderUuid,) => {
  return request({
    url: "/InventoryInOrder/findByOrderUuid",
    params: {orderUuid},

  })
}

export const updateSn = (uuid, sn,) => {
  return request({
    url: "/InventoryInOrder/updateSn",
    params: {uuid, sn},

  })
}
