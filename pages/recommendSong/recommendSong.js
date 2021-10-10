// pages/recommendSong/recommendSong.js

// 引入网络请求函数
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '', // 天数
    month: '', // 月份
    recommendList: [] // 推荐列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          // 跳转到登录页面
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      })
    }
    // 获取每日推荐的数据
    this.getRecommendList()

    // 更新日期的状态数据
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
  },

  // 获取用户每日推荐数据
  async getRecommendList() {
    let recommendListData = await request('/recommend/songs')
    // console.log(recommendListData);
    // 更新状态数据
    this.setData({
      recommendList: recommendListData.recommend
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