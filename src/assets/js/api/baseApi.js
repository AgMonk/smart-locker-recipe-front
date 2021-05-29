import {request} from "../AxiosUtils";


export const baseDel = (prefix, id) => {
  return request({
    url: prefix + "/del",
    params: {id},

  })
}

export const baseFindAll = (prefix) => {
  return request({
    url: prefix + "/findAll",
  })
}

export const basePage = (prefix, {page = 1, size = 10, start, end, condition}) => {
  return request({
    url: prefix + "/page",
    data: {page, size, start, end, condition},

  })
}

export const baseSave = (prefix, data) => {
  return request({
    url: prefix + "/save",
    data,

  })
}
export const baseAdd = (prefix, data) => {
  return request({
    url: prefix + "/add",
    data,

  })
}
export const baseUpdate = (prefix, data) => {
  return request({
    url: prefix + "/update",
    data,

  })
}
