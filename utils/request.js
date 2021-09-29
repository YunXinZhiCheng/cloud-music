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
      // 请求头 本地读取cookie字段 
      header: {
        // 三元运算判断 登录有cookie 不登录cookie就为空
        cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
      },

      // 请求成功
      success: res => {
        // console.log('请求成功：', res.data);

        // 登录cookie
        if (data.isLogin) {
          // 将用户的cookie存入到本地
          wx.setStorage({
            key: 'cookies',
            data: res.cookies
          })
        }

        // console.log(res);
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