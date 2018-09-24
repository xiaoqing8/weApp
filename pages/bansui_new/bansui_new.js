
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emr: "",
    zz_textarea: "",
    bansui: [], 
    wait_index: 1,
    addzz: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wait_bansui: JSON.parse(options.wait_bansui),
      wait_bansui_list: JSON.parse(options.wait_bansui_list),
      emr: options.emr,
      zz_textarea: options.zz_textarea,
      answers: options.answers,
      tihao: parseInt(options.tihao) + 1,
    })
    this.setData({
      first_in_bansui: this.data.zz_textarea.split('、')
    })
    this.data.bansui.push(this.data.first_in_bansui)
  },

  checkboxChangeBS: function(e) {
    var len = e.detail.value.length
    if (e.detail.value == "都没有") {
      this.setData({
        emr: this.data.emr,
        //  + "否认高血压史、心肌梗死病史、糖尿病史、急性肾炎病史、心绞痛史."
      })
      if (this.data.zz_textarea == "急性病毒性咽炎" || this.data.zz_textarea == "急性病毒性喉炎" || this.data.zz_textarea == "慢性支气管炎" || this.data.zz_textarea == "慢性阻塞性肺疾病" || this.data.zz_textarea == "普通感冒") {
        this.setData({
          zz_textarea: e.detail.value[0]
        })
      }
    } else {
      this.setData({
        emr: this.data.emr + e.detail.value[len - 1] + " ",
      })
      if (this.data.zz_textarea == "急性病毒性咽炎" || this.data.zz_textarea == "急性病毒性喉炎" || this.data.zz_textarea == "慢性支气管炎" || this.data.zz_textarea == "慢性阻塞性肺疾病" || this.data.zz_textarea == "普通感冒") {
        this.setData({
          zz_textarea: e.detail.value[0]
        })
      }
    }
    this.data.bansui.push(e.detail.value)
  },

// 症状自主输入函数
  addSymp: function (e) {
    this.setData({
      addzz: e.detail.value
    })
  },

  //事件处理函数
  ok_symptom: function (e) {
    var len = Object.keys(this.data.wait_bansui_list).length
    if (this.data.wait_index < len) {
      var name = 'wait_bansui_' + (this.data.wait_index + 1)
      this.setData({
        wait_bansui: this.data.wait_bansui_list[name],
        wait_index: this.data.wait_index + 1,
        tihao: this.data.tihao + 1
      })
      this.data.bansui.push([this.data.addzz]),
      this.setData({
        emr: this.data.emr + this.data.addzz + " ",
        addzz: ''
      })
    } else {
      this.data.bansui.push([this.data.addzz]),
      this.setData({
        emr: this.data.emr + this.data.addzz + "。",
      })
      wx.redirectTo({
        url: '../../pages/history/history?emr=' + this.data.emr + "&zz_textarea=" + this.data.zz_textarea + "&bansui=" + JSON.stringify(this.data.bansui) + "&tihao=" + this.data.tihao + "&answers=" + this.data.answers
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