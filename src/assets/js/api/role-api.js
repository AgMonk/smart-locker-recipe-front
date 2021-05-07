import {requestWithCache} from "../requestUtils";

let prefix = "/role"

export const hasRoles = (success)=>{
  return requestWithCache({
    url:prefix+"/hasRoles",
    namespace:"myRoles",
    success
  })
}
