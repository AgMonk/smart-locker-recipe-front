//用户api

import {request} from "../../AxiosUtils";

let prefix = "/user"

export const login = ({username, password,}) => {
  return request({
    url: prefix + "/login",
    params: {username, password},

  })
}

export const logout = ({}) => {
  return request({
    url: prefix + "/logout",

  })
}

export const reg = ({username, password, name, phone, area,}) => {
  return request({
    url: prefix + "/reg",
    data: {username, password, name, phone, area},

  })
}

export const userInfo = ({}) => {
  return request({
    url: prefix + "/info",
    namespace: "userInfo",

  })
}

export const editUserInfo = ({phone, name, area,}) => {
  return request({
    data: {phone, name, area},
    url: prefix + "/editUserInfo",
    namespace: "userInfo",

  })
}

export const editPassword = ({oldPass, newPass,}) => {
  return request({
    url: prefix + "/editPassword",
    params: {oldPass, newPass},

  })
}

export const page = ({page, size, condition,}) => {
  return request({
    url: prefix + "/a/page",
    data: {page, size, condition},
    namespace: "user-page",

  })
}
