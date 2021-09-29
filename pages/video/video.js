// pages/video/video.js

// 引入网络请求函数
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航列表数据
    navId: '', // 导航列表标识 
    videoList: [], // 视频列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  调用函数：获取导航列表数据
    this.getVideoGroupListData()

  },

  // 函数：获取导航列表数据
  async getVideoGroupListData() {
    let videoGroupListData = await request('/video/group/list')
    // console.log(videoGroupListData);

    // 更新数据: 使用数组方法截取10多个即可
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 10),
      navId: videoGroupListData.data[0].id
    })

    // 调用函数：获取视频列表数据
    this.getVideoList(this.data.navId)
  },

  // 函数：获取视频列表数据
  async getVideoList(navId) {
    if (!navId) {
      return;
    }
    let videoListData = await request('/video/group', {
      id: navId
    })
    console.log(videoListData);

    // 更新数据 视频列表
    this.setData({
      videoList: videoListData.datas
    })

  },

  // 事件：点击切换导航的样式
  changeNav(event) {
    // console.log(event);
    let navId = event.currentTarget.id

    // 更新数据：导航navId
    this.setData({
      navId: navId
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