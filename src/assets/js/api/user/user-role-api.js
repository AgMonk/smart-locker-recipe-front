import {request} from "../../AxiosUtils";

let prefix = "/user_role"

export const hasRoles = userId => {
  return request({
    url: prefix + "/hasRoles",
    params: {userId},
  })
}
