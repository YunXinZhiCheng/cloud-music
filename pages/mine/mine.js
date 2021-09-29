// pages/mine/mine.js

// 定义几个变量: 手指起始的坐标+移动坐标+移动的距离
let startY = 0
let moveY = 0
let moveDistance = 0

// 引入网络请求函数
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(200rpx)', // 移动距离
    coverTransition: '', // 过渡效果
    userInfo: {}, // 用户信息
    recentPlayList: [], // 用户最近播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取用户的基本信息 getStorageSync('key')
    let userInfo = wx.getStorageSync('userInfo')
    // console.log('userInfo:', userInfo);

    // 判断用户的基本信息
    if (userInfo) {
      // 更新用户信息的状态
      this.setData({
        userInfo: JSON.parse(userInfo) // 转换格式
      })
      // 获取用户最近播放记录
      this.getUserRecentPlayList(this.data.userInfo.userId)
    }
  },


  // 事件处理: 用户最近播放记录
  async getUserRecentPlayList(userId) {
    let recentPlayListData = await request('/user/record', {
      uid: userId,
      type: 0
    })
    // console.log(recentPlayListData); // 最近播放记录

    // 更新数据: 截取10条播放记录 splice(0,10)
    this.setData({
      recentPlayList: recentPlayListData.allData
      // recentPlayList: recentPlayListData.allData.splice(0,10)
    })
  },

  // 3个事件处理: 事件对象event
  handleTouchStart(event) {
    // 更新过渡状态: 重置
    this.setData({
      coverTransition: ''
    })

    // console.log(event);
    // console.log('开始Start');
    startY = event.touches[0].clientY
    // console.log('初始的坐标：', startY);


  },
  handleTouchMove(event) {
    // console.log('移动Move');
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    // console.log('移动的距离：', moveDistance);

    // 距离小于0 停止移动
    if (moveDistance <= 0) {
      return;
    }
    if (moveDistance >= 80) {
      moveDistance = 80
    }

    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })

  },
  handleTouchEnd() {
    // console.log('结束End');
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coverTransition: 'transform 1s linear' // 平滑过渡
    })


  },

  // 事件：跳转到登录页面 login
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
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