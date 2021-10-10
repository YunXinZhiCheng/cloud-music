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
    videoId: '', // 视频id标识
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
      navId: videoGroupListData.data[0].id,
    })

    // 调用函数：获取视频列表数据
    this.getVideoList(this.data.navId)
  },

  // 函数：获取视频列表数据
  async getVideoList(navId) {
    if (!navId) {
      return
    }
    let videoListData = await request('/video/group', {
      id: navId,
    })
    // console.log(videoListData);

    // 消息提示关闭：
    wx.hideLoading()

    // 更新数据 视频列表
    this.setData({
      videoList: videoListData.datas,
    })
  },

  // 事件：点击切换导航的样式
  changeNav(event) {
    // console.log(event);
    let navId = event.currentTarget.id

    // 更新数据：导航navId
    this.setData({
      navId: navId,
      videoList: [], // 切换时视频列表重置为空数组
    })
    // 消息提示：切换时显示正在加载
    wx.showLoading({
      title: '正在加载...',
    })

    // 调用函数：动态或当前导航对应的视频数据
    this.getVideoList(this.data.navId)
  },

  // 事件：点击播放/继续播放的问题
  handlePlay(event) {
    let vid = event.currentTarget.id
    // 关闭上一个播放的视频
    this.vid !== vid && this.videoContext && this.videoContext.stop()
    this.vid = vid

    // 更新data中videoId的状态数据
    this.setData({
      videoId: vid,
    })

    // 创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid)
    // this.videoContext.play() // 播放
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
