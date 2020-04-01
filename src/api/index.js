import axios from 'axios';
import router from '@/router'
import { Loading, Message } from 'element-ui' // 引用element-ui的加载和消息提示组件



const apiContext = require.context('./' , true, /index\.js$/);
let $api = {};
apiContext.keys().forEach(route => {
  // 如果是根目录的 index.js、 不做任何处理         
  if (route.startsWith('./index')) {
    return
  }                   
  const routerModule = apiContext(route)         
  // 兼容 import export 和 require module.export 两种规范  Es modules  commonjs
  $api = {...$api, ...(routerModule.default || routerModule)}  
});

const $axios = axios.create({
    // 设置超时时间
    timeout: 30000,
    // 基础url，会在请求url中自动添加前置链接
    baseURL: '/api'
})

let loading = null;
// 请求拦截器
$axios.interceptors.request.use(
    config => {
      loading = Loading.service({ text: '拼命加载中' })
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token // 请求头部添加token
        console.log(config);
      }else {
        Message.error('登录过期')
        router.replace({
          path: '/login',
          query: {
          redirect: router.currentRoute.fullPath
          }
        })
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
$axios.interceptors.response.use(
response => {
    if (loading) {
    loading.close()
    }
    const code = response.status
    if ((code >= 200 && code < 300) || code === 304) {
    return Promise.resolve(response.data)
    } else {
    return Promise.reject(response)
    }
},
error => {
    if (loading) {
    loading.close()
    }
    if (error.response) {
    switch (error.response.status) {
        case 401:
        router.replace({
            path: '/login',
            query: {
            redirect: router.currentRoute.fullPath
            }
        })
        break
        case 404:
        Message.error('网络请求不存在')
        break
        case 500:
        Message.error('服务器错误')
        break
        default:
        Message.error(error.response.data.message)
    }
    } else {
    // 请求超时或者网络有问题
    if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
    } else {
        Message.error('请求失败，请检查网络是否已连接')
    }
    }
    return Promise.reject(error)
}
)
export {$axios, $api} 
// export default $axios