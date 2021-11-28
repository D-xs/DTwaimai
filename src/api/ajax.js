// ajax请求函数模块
import axios from "axios"
// 返回值: Promise对象(异步返回的数据是：response.data)
export default function ajax (url, data={}, type='GET') {
  // 再包一层promise，用来直接取出data
  return new Promise((resolve, reject) => {
    let promise
    if(type === 'GET') {
      // 用来存储query参数
      let dataStr = ''
      // 拼串操作
      Object.keys(data).forEach(key => {
        dataStr += `${key}=${data[key]}&`
      })
      // 判断data是否为空串,去掉最后一个字符
      if(dataStr!== '') {
        dataStr = dataStr.substr(0,dataStr.length-1)
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url,data)
    }
    promise.then((response) => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
