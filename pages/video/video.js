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
    videoUpdateTime: [], // 记录视频播放时长
    isTriggered: false, // 下拉刷新是否被触发标识
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
      isTriggered:false // 下拉刷新提示关闭
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

    // 判断当前的视频之前是否播放过，是否有播放记录，如果有就跳转到指定的播放位置
    let { videoUpdateTime } = this.data
    let videoItem = videoUpdateTime.find((item) => item.vid === vid)
    if (videoItem) {
      this.videoContext.seek(videoItem.currentTime)
    }
  },

  // 事件：监听视频播放进度的回调
  handleTimeUpdate(event) {
    // console.log(event)
    // 视频时间对象：id与当前时间
    let videoTimeObj = {
      vid: event.currentTarget.id,
      currentTime: event.detail.currentTime,
    }
    //
    let { videoUpdateTime } = this.data
    //
    let videoItem = videoUpdateTime.find(
      (item) => item.vid === videoTimeObj.vid
    )
    if (videoItem) {
      //
      videoItem.currentTime = event.detail.currentTime
    } else {
      //
      videoUpdateTime.push(videoTimeObj)
    }
    // 更新数据
    this.setData({
      videoUpdateTime,
    })
  },

  // 事件：视频播放结束时调用的回调
  handleEnded(event) {
    // console.log('播放结束')

    // 移除记录播放时长数组中当前视频的对象 splice()
    let { videoUpdateTime } = this.data
    let index = videoUpdateTime.findIndex(
      (item) => item.vid === event.currentTarget.id
    )
    videoUpdateTime.splice(index, 1)

    // 更新数据
    this.setData({
      videoUpdateTime,
    })
  },

  // 事件：自定义下拉刷新的回调
  handleRefresher() {
    // console.log('scroll-view 下拉刷新');
    // 再次发起请求，获取最新视频的数据
    this.getVideoList(this.data.navId)
  },


  // 事件：自定义上拉触底的回调
  handleToLower(){
    // console.log('scroll-view 上拉触底');
    // 加载更多数据：1.后端分页 2.前端分页
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
