// pages/songDetail/songDetail.js

// 引入网络请求函数
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, // 音乐是否播放
    song: {}, // 歌曲详情对象
    musicId: '', // 歌曲音乐id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(JSON.parse(options.song)); // options用于接收路由传参的
    let musicId = options.musicId
    // console.log(options);
    // console.log('音乐的ID：'+musicId);

    // 获取音乐详情的功能函数
    this.getMusicInfo(musicId)

    // 更新数据
    this.setData({
      musicId
    })
  },

  // 获取音乐详情的功能函数
  async getMusicInfo(musicId) {
    let songData = await request('/song/detail', {
      ids: musicId
    })
    // console.log(songData);
    // 更新数据状态
    this.setData({
      song: songData.songs[0]
    })
    // 动态修改窗口标题
    wx.setNavigationBarTitle({
      title: this.data.song.name,
    })
  },
  // 事件：点击播放或暂停的回调
  handleMusicPlay() {
    let isPlay = !this.data.isPlay
    // 更新播放状态
    this.setData({
      isPlay
    })
    // 调用控制音乐播放或暂停的功能函数
    let {
      musicId
    } = this.data
    this.musicControl(isPlay, musicId)
  },

  // 控制音乐播放或暂停的功能函数
  async musicControl(isPlay,musicId) {
    // 创建音乐播放实例
    let backgroundAudioManager = wx.getBackgroundAudioManager()

    // 判断
    if (isPlay) { // 音乐播放
      // 获取音乐播放链接
      let musicLinkData = await request('/song/url', {
        id: musicId
      })
      let musicLink = musicLinkData.data[0].url

      backgroundAudioManager.src = musicLink
      backgroundAudioManager.title=this.data.song.name
    } else { // 音乐暂停
      backgroundAudioManager.pause()
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