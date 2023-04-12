import { Cache } from "@raycast/api"

export const getLoginStatus= (): boolean => {
  const cache = new Cache()
  console.log(cache.get('cookie'));
  
  return !!(cache.get("expires") && new Date(cache.get("expires")!).getTime() > Date.now())
}
