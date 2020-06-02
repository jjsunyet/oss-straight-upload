import axios from 'axios'
import QS from 'qs'
import router from '../../router'
import { Message } from 'element-ui'
let token = '';
//环境的切换
if(process.env.NODE_ENV == 'development'){ //开发环境
  axios.defaults.baseURL = '/api';
}else if(process.env.NODE_ENV == 'production'){ //生产环境
  // axios.defaults.baseURL = 'http://47.104.93.173:8080/queshan/'; //测试服务器的地址
  axios.defaults.baseURL = 'http://118.190.55.201/queshan/'; //正式服务器的地址
}
axios.defaults.withCredentials = true;
axios.defaults.timeout = 90000;
// axios.defaults.headers['token'] = '123';
//创建axios自定义服务
// const service = axios.create({
//     timeout:90000,
//     withCredentials: true,
//     headers:{
//         'token':'123'
//     }
// })

//添加请求拦截器
axios.interceptors.request.use(function(config){
  let useMsg = QS.parse(window.sessionStorage.getItem('userMsg'));
  if(useMsg){
    token = useMsg.token;
  }
  config.headers.common['token'] = token;
  return config;
},function(error){
  return Promise.reject(error);
})

//添加响应拦截器
axios.interceptors.response.use(function(response){
  // console.log(response);
  if(response.status === 200){ //如果返回的状态吗是200，说明成功，否则抛出错误。
    if(response.data.code == '408'){
      window.sessionStorage.clear();
      router.push('/');
      Message({
        message:'登录状态失效，请重新登陆！',
        type:'success'
      })
    }else{
      return Promise.resolve(response);
    }
  }else{
    return Promise.reject(response);
  }
},function(error){
  return Promise.reject(error);
})
//封装get方法
/**
 *
 * @param {String} url 请求的地址
 * @param {Object} params 请求携带的参数
 * get方法返回一个Promise对象
 */
export function get(url,params){
  return new Promise((resolve,reject)=>{
    axios.get(url,{
      params:params
    }).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  })
}
//封装post方法
/**
 *
 * @param {String} url 请求的地址
 * @param {Object} params 请求携带的参数
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
export function post(url,params={},config ={}) {
  let useMsg = QS.parse(window.sessionStorage.getItem('userMsg'));
  if(useMsg){
    token = useMsg.token;
  }
  const conf = Object.assign(
    {
      url,
      method: 'post',
      data: QS.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type':'multipart/form-data;boundary = ' + new Date().getTime(),
        // 'Content-Type':'multipart/form-data;boundary',
      }
    },
    config
  );
  return axios(conf).then(respnose => none(respnose))
}
export function myPost(url,params={},config ={}) {
  let useMsg = QS.parse(window.sessionStorage.getItem('userMsg'));
  if(useMsg){
    token = useMsg.token;
  }
  const conf = Object.assign(
    {
      url,
      method: 'post',
      data: QS.stringify(params),
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'multipart/form-data; boundary='${boundary}//jq
        // 'Content-Type':'multipart/form-data;boundary = ' + new Date().getTime(),
        // 'Content-Type':'multipart/form-data;boundary',
      }
    },
    config
  );
  return axios(conf).then(respnose =>none(respnose))
}
export function sendPost(url,params={},config ={}) { //发送字符串数据，上传不要使用这个
  let useMsg = QS.parse(window.sessionStorage.getItem('userMsg'));
  if(useMsg){
    token = useMsg.token;
  }
  // return new Promise((resolve,reject)=>{
  //   axios.post(url,data)
  //     .then(res=>{
  //       resolve(res);
  //     },err=>{
  //       reject(err);
  //     })
  // })
  const conf = Object.assign(
    {
      url,
      method: 'post',
      data: QS.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },
    config
  );
  return axios(conf).then(respnose =>none(respnose))
}
//暴露实例
export default axios

