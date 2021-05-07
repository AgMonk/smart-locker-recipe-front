//用户api
import {request, requestWithCache} from "../../requestUtils";

let prefix = "/user"

export const getStatus = (success) => {
  return request({
    url: prefix + "/status"
    , success
  })
}

export const login = ({username, password, success}) => {
  return request({
    url: prefix + "/login",
    params: {username, password},
    success
  })
}

export const logout = ({success}) => {
  return request({
    url: prefix + "/logout",
    success
  })
}

export const reg = ({username, password, name,phone,success})=>{
  return request({
    url: prefix + "/reg",
    data:{username, password, name,phone},
    success
  })
}

export const userInfo = ({success}) => {
  return request({
    url: prefix + "/info",
    namespace: "userInfo",
    success
  })
}

export const editUserInfo =({phone,name,success})=>{
  return request({
    data:{phone,name},
    url: prefix + "/editUserInfo",
    namespace: "userInfo",
    success
  })
}

export const editPassword = ({oldPass,newPass,success})=>{
  return request({
    url: prefix + "/editPassword",
    params:{oldPass,newPass},
    success
  })
}

export const page = ({page,size,condition,success})=>{
  return request({
    url: prefix + "/a/page",
    data:{page,size,condition},
    namespace: "user-page",
    success
  })
}
