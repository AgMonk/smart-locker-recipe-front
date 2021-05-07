import {request} from "../../requestUtils";

let prefix = "/role"

export const hasRoles = (success) => {
  return request({
    url: prefix + "/hasRoles",
    namespace: "myRoles",
    success
  })
}

