// index.js
// 引入封装好的请求功能函数
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 没有封装的请求方式
    // wx.request({
    //   url:'https://lyccode.vercel.app/',
    //   data:{type:2},
    //   // 请求成功
    //   success: res => {
    //     console.log('请求成功：', res);
    //   },
    //   // 请求失败
    //   fail: err => {
    //     console.log('请求失败：', err);
    //   }
    // })

    // 封装好的请求方式
    let result = await request('/banner', {
      type: 2
    })
    console.log('结果数据:', result);
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