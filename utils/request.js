//  发送ajax请求
// 引入服务器配置相关信息
import config from './config'

// 封装请求功能函数
export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    // 1.new Promise 初始化promise实例的状态为pending
    // 2.resolve 修改promise实例的状态为成功状态resolved
    // 3.reject 修改promise实例的状态为失败状态rejected

    wx.request({
      url: config.host + url,
      data,
      method,
      // 请求成功
      success: res => {
        // console.log('请求成功：', res.data);
        resolve(res.data)
      },
      // 请求失败
      fail: err => {
        // console.log('请求失败：', err);
        reject(err)
      }
    })
  })


}