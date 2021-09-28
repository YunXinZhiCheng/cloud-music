// index.js
// 引入封装好的请求功能函数
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], // 轮播图数据
    recommendList: [], // 推荐歌单数据
    topList: [], // 排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 网络请求
    // 1.获取轮播图数据
    let bannerListData = await request('/banner', {
      type: 2
    })
    // console.log(bannerListData);
    this.setData({
      bannerList: bannerListData.banners
    })

    // 2.获取推荐歌单数据
    let recommendListData = await request('/personalized', {
      limit: 10
    })
    // console.log(recommendListData)
    this.setData({
      recommendList: recommendListData.result
    })

    // 3.获取排行榜数据
    let index = 0
    let resultArray = []
    while (index < 5) {
      let topListData = await request('/top/list', {
        idx: index++
      })
      // 数组截取个数,不修改原数组 slice
      let topListItem = {
        name: topListData.playlist.name,
        tracks: topListData.playlist.tracks.slice(0, 3)
      }

      resultArray.push(topListItem)
      // 更新状态数据，为提升用户体验，循环让5次请求依次发送
      this.setData({
        topList: resultArray
      })

    }
    // console.log(resultArray);



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