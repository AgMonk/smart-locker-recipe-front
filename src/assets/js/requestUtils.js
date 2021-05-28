import axios from "axios";
import Vue from "vue";

/**
 * 发送请求
 * @param url url
 * @param params 地址栏参数
 * @param data 正文参数
 * @param method 请求方法
 * @param success 执行成功时执行方法
 * @returns {Promise<>}
 */
export const request = ({url, params, data, method = "post", success}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: "/api" + url,
      method, params, data,
    }).then(res => {
      if (res) {
        let d = res
        if (d.code === 2000) {
          if (success) {
            success(d)
          }
          resolve(d)
        } else {
          Vue.prototype.$message(d.message)
          reject(d)
        }
      } else {
        reject(res)
      }
    })
  })
}
/**
 * 先在缓存中查找数据 如果没有则发送请求，并把请求结果放入缓存
 * @param storage sessionStorage 或 localStorage
 * @param namespace 数据的命名空间，作为缓存key一部分使用
 * @param expires 数据超时时间（分钟）
 * @param url 请求地址
 * @param params 地址栏参数
 * @param data 正文参数
 * @param method 请求方法
 * @param success 执行成功时执行方法
 * @param flush 执行成功后是否刷新命名空间缓存(添加、编辑、删除操作需要)
 */
export const requestWithCache = ({
                                   storage = sessionStorage,
                                   expires = 30,
                                   flush = false,
                                   namespace,
                                   url,
                                   params,
                                   data,
                                   method,
                                   success,
                                 }) => {
  let param = params ? params : data;
  let key = getKeyByPrefixParam(namespace, param)
  let expiresKey = getKeyByPrefixParam(namespace + "Expires", param);
  let now = new Date().getTime() / 1000 / 60;

  //非刷新方法时才尝试从缓存读取数据
  if (!flush) {
    let obj = getCache(storage, key);
    let objExpires = getCache(storage, expiresKey);
    //数据仍在有效期内
    if (obj && objExpires && now - objExpires < expires) {
      return new Promise(resolve => {
        console.info("从缓存返回数据:" + url)
        console.log(obj)
        resolve(obj);
      });
    }
  }
  //没有数据或已超时
  return new Promise((resolve, reject) => {
    request({url, params, data, method, success})
      .then(res => {
        if (flush) {
          //请求成功后 如果是刷新方法，刷新缓存
          flushCache(storage, namespace)
        } else {
          //如果不是刷新方法，缓存数据
          putCache(storage, key, res)
          putCache(storage, expiresKey, now)
        }
        resolve(res)
      })
      .catch(reason => {
        reject(reason)
      })
  })
}

/**
 * 把数据放入缓存
 * @param storage sessionStorage 或 localStorage
 * @param key 键
 * @param value 值
 */
export const putCache = (storage, key, value) => {
  storage.removeItem(key);
  storage.setItem(key, JSON.stringify(value));
}
/**
 * 从缓存中取出数据
 * @param storage sessionStorage 或 localStorage
 * @param key 键
 * @returns {any}
 */
export const getCache = (storage, key) => {
  return JSON.parse(storage.getItem(key));
}
/**
 * 刷新指定前缀的缓存
 * @param storage sessionStorage 或 localStorage
 * @param keyPrefix 键前缀
 */
export const flushCache = (storage, keyPrefix) => {
  let keys = Object.keys(storage);
  keys.forEach(key => {
    if (key.startsWith(keyPrefix)) {
      storage.removeItem(key);
    }
  })
}
/**
 * 清空缓存
 * @param storage  sessionStorage 或 localStorage
 */
export const clearCache = (storage) => {

  if (storage) {
    storage.clear();
  } else {
    sessionStorage.clear();
    localStorage.clear();
  }
}
export const getKeyByPrefixParam = (prefix, param) => {
  if (!param) {
    return prefix
  }
  return prefix + "=>" + JSON.stringify(param);
}


/*基础api*/

export const page = ({
                       current = 1, size = 10,
                       orderByField,
                       orderBy,
                       keywords,
                       names,
                       startTime, endTime,
                       urlPrefix,
                       success,
                     }) => {
  if (typeof (keywords) === 'string') {
    keywords = keywords.split(" ");
  }
  if (typeof (names) === 'string') {
    names = names.split(" ");
  }

  let data = {
    current, size,
    orderByField,
    orderBy,
    keywords,
    names,
    startTime, endTime,
  }

  return requestWithCache({
    url: "/" + urlPrefix + "/page",
    expires: 5,
    data, success,
    namespace: urlPrefix,
  })
}

export const save = ({
                       urlPrefix,
                       success,
                       data,
                     }) => {
  return requestWithCache({
    url: "/" + urlPrefix + "/save",
    data, success,
    namespace: urlPrefix,
    flush: true,
  })
}

export const update = ({
                         urlPrefix,
                         success,
                         data,
                       }) => {
  return requestWithCache({
    url: "/" + urlPrefix + "/update",
    data, success,
    namespace: urlPrefix,
    flush: true,
  })
}

export const del = ({
                      urlPrefix,
                      success,
                      id,
                    }) => {
  if (!confirm("确认删除?")) {
    return;
  }
  return requestWithCache({
    url: "/" + urlPrefix + "/del",
    params: {id}, success,
    namespace: urlPrefix,
    flush: true,
  })
}

