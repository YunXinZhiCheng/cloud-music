// pages/login/login.js

// 引入网络请求函数
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', // 手机号码
    password: '', // 密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 事件处理：拿到表单数据 event.detail.value 
  // 事件处理：拿到表单类型：event.currentTarget.id
  handleInput(event) {
    // console.log('表单数据：',event.detail.value);
    // console.log('表单类型：',event.currentTarget.id);

    // let type = event.currentTarget.id  // id传值，取值phone或者password
    // console.log(type, event.detail.value);

    let type = event.currentTarget.dataset.type // data-type传值

    // 更新数据
    this.setData({
      [type]: event.detail.value
    })
  },

  // 事件处理：登录按钮
  async login() {
    // 1.获取表单项数据 
    let {
      phone,
      password
    } = this.data // 解构赋值
    // 2.手机号码验证: 为空，不为空
    // 为空：提示
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none' // 不显示图标
      })
      return; // 后续不再执行
    }
    // 不为空：先定义正则表达式，再判断进行提示
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return; // 后续不再执行
    }
    // 3.密码验证 为空 不为空
    if (!password) {
      wx.showToast({
        title: '密码为空',
        icon: 'none'
      })
      return; // 后续不再执行
    }
    // wx.showToast({
    //   title: '前端验证通过',
    // })

    // 后端验证
    let result = await request('/login/cellphone', {
      phone,
      password
    })
    console.log(result);
    // 使用状态码判断登录结果 200 400 502 其他
    if (result.code === 200) {
      wx.showToast({
        title: '登录成功',
      })
    } else if (result.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    } else if (result.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})