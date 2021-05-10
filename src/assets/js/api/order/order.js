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
  if (!confirm("确认派单？")) {
    return
  }
  return request({
    url: prefix + "/assign",
    params: param,
    success
  })
}
