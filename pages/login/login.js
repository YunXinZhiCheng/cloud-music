// pages/login/login.js
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