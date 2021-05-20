import {request} from "../../requestUtils";

let prefix = "/InstallationOrder"

export const submit = (uuid,success)=> {

  return request({
    url: prefix + "/submit",
    params: {uuid},
    success
  })
}

export const complete = (uuid,success)=> {

  return request({
    url: prefix + "/complete",
    params: {uuid},
    success
  })
}

export const confirmOrder = (uuid,success)=> {
  return request({
    url: prefix + "/confirm",
    params: {uuid},
    success
  })
}

export const assignOrder = (param,success)=>{
return request({
    url: prefix + "/assign",
    params: param,
    success
  })
}

export const abandon = (param,success)=>{
  return request({
    url: prefix + "/abandon",
    params: param,
    success
  })
}

export const editInventoryMap = (data,success)=>{
  return request({
    url: prefix + "/editInventoryMap",
    data,
    success
  })
}

export const  findByOrderUuid = (orderUuid,success)=>{
  return request({
    url:"/InventoryInOrder/findByOrderUuid",
    params:{orderUuid},
    success
  })
}

export const updateSn = (uuid,sn,success)=>{
  return request({
    url:"/InventoryInOrder/updateSn",
    params:{uuid,sn},
    success
  })
}
