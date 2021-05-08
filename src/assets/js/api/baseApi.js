import {request} from "../requestUtils";

export const baseDel = (prefix,id, success) => {
  return request({
    url: prefix + "/del",
    params: {id},
    success
  })
}

export const baseFindAll = (prefix,success) => {
  return request({
    url: prefix + "/findAll",
    success
  })
}

export const basePage = (prefix,{page=1, size=10, start, end, condition}, success) => {
  return request({
    url: prefix + "/page",
    data :{page, size, start, end, condition},
    success
  })
}

export const baseSave = (prefix,data,success) => {
  return request({
    url: prefix + "/save",
    data,
    success
  })
}
export const baseAdd = (prefix,data,success) => {
  return request({
    url: prefix + "/add",
    data,
    success
  })
}
export const baseUpdate = (prefix,data,success) => {
  return request({
    url: prefix + "/update",
    data,
    success
  })
}
