import {request, requestWithCache} from "../../requestUtils";

let prefix = "/user_role"

export const hasRoles = (userId,success) => {
  return request({
    url: prefix + "/hasRoles",
    params:{userId},
    namespace: "myRoles",
    success
  })
}
