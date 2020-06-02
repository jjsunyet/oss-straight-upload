import axios from 'axios'
import qs from 'querystring'

import { Message } from 'element-ui'
// let loadingInstance

/**
 * config axios
 *
 */

/* api前缀 */
// axios.defaults.baseURL = process.env.API_ENV.API_SERVER

/* 请求超时 */
axios.defaults.timeout = 20 * 1000

/* 请求头类型 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/*/!* 请求拦截 *!/
axios.interceptors.request.use((conf) => {
    // config = Object.assign({
    //   loading: 'body'
    // }, config)
    const config = Object.assign({}, conf)
    // config.headers.Authorization = window.localStorage.getItem('token')
    config.withCredentials = true
    return config
})

/!* 响应拦截 *!/
axios.interceptors.response.use(
    response => response.data,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('401')
                    break
                case 500:
                    console.log('500')
                    break
                case 404:
                    console.log('404')
                    break
                case 504:
                    console.log('504')
                    break
                default:
                    break
            }
        }
        Promise.reject(error.response.data)
    }
)*/

/**
 * get封装
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 */
const get = (url, params = {}, config = {}) => {


  const conf = Object.assign(
    {
      url,
      method: 'get',
      params
    },
    config
  )
  return axios(conf).then(respnose => none(respnose))
}

/**
 * post封装
 * @param {String} url
 * @param {Object} data
 * @param {Object} config
 */
const post = (url, data = {}, config = {}) => {
  const conf = Object.assign(
    {
      url,
      method: 'post',
      data: qs.stringify(data),
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    },
    config
  )
  return axios(conf).then(respnose => none(respnose))
}

/**
 @param {String} url
 * @param {Object} data
 * @param {Object} conf
 */
const ajax = (url, data = null, conf = {}) => {
  const confInit = {}
  if (!conf.method) confInit.method = 'POST'
  if (['PUT', 'POST', 'PATCH'].includes(conf.method.toUpperCase())) {
    confInit.data = data
  } else {
    confInit.params = data
  }
  const config = Object.assign(
    {
      url
    },
    conf,
    confInit
  )
  return axios(config).then(respnose => none(respnose))
}

/**
 * 错误code处理
 * @param {Object} response
 */
const none = (response) => {
  // 在此处理后台反馈的错误码
  // if (response.success === 1) {
  //     if (response.errorCode) {
  //         Message.error(response.errorMsg)
  //         return Promise.reject(response.errorMsg)
  //     }
  //     return Promise.resolve(response)
  // }
  // return Promise.reject(response.errorMsg)
  return Promise.resolve(response)
}

export default {
  ajax,
  post,
  get
}
