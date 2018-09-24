
//获取应用实例
const app = getApp()

// 回答一个问题就更改一次emr的值

Page({
  tihao: 1,
  /**
   * 页面的初始数据
   */
  data: {
    pastlist: ["高血压史", "心肌梗死病史", "糖尿病史", "急性肾炎病史", "心绞痛史"],
    pastDis: [
      { name: "高血压史", value: "高血压史" },
      { name: "心肌梗死病史", value: "心肌梗死病史" },
      { name: "糖尿病史", value: "糖尿病史" },
      { name: "急性肾炎病史", value: "急性肾炎病史" },
      { name: "心绞痛史", value: "心绞痛史" },
      { name: "都没有", value: "都没有" },
      { name: "不清楚", value: "不清楚" },
    ],
    allerlist: ["花粉过敏史", "螨虫过敏史", "粉尘过敏史"],
    Allergic: [
      { name: "花粉过敏史", value: "花粉过敏史" },
      { name: "螨虫过敏史", value: "螨虫过敏史" },
      { name: "粉尘过敏史", value: "粉尘过敏史" },
      { name: "以上都没有", value: "以上都没有" },
    ],
    emr: "",
    addPast: "",
    addAller: ""
  },
  // 既往病史处理
  checkboxChangePastDis: function (e) {
    var len = e.detail.value.length
    if (this.data.emr.indexOf("既往史") == -1) {
      if (e.detail.value == "都没有") {
        this.setData({
          temp:  "否认高血压史、心肌梗死病史、糖尿病史、急性肾炎病史、心绞痛史。"
        })
      } else if (e.detail.value == "不清楚") {
        this.setData({
          temp: "不确定是否患有高血压史、心肌梗死病史、糖尿病史、急性肾炎病史、心绞痛史。"
        })
      } else {
        this.setData({
          temp: e.detail.value
        })
      }
      this.setData({
        emr: this.data.emr + "\n" + "既往史：" + this.data.temp + " "
      })
    } else {
      if (e.detail.value == "都没有") {
        this.setData({
          emr: this.data.emr + "否认高血压史、心肌梗死病史、糖尿病史、急性肾炎病史、心绞痛史。"
        })
      } else if (e.detail.value == "不清楚") {
        this.setData({
          emr: this.data.emr + "不确定是否患有高血压史、心肌梗死病史、糖尿病史、急性肾炎病史、心绞痛史。"
        })
      } else {
        this.setData({
          emr: this.data.emr + e.detail.value[len - 1] + " "
        })
      }
    }
    console.log(this.data.emr)
  },
  addpastdis: function (e) {
    this.setData({
      addPast: e.detail.value
    })
  },
  okAddPast: function (e) {
    this.setData({
      emr: this.data.emr + this.data.addPast + "。"
    })
    console.log(this.data.emr)
  },
  // 过敏史处理
  checkboxChangeAller: function (e) {
    if (this.data.emr.indexOf("过敏史") == -1) {
      if (e.detail.value == "以上都没有") {
        this.setData({
          temp: "否认花粉过敏史、螨虫过敏史、粉尘过敏史"
        })
      } else {
        this.setData({
          temp: e.detail.value
        })
      }
      this.setData({
        emr: this.data.emr + "\n" + "过敏史：" + this.data.temp + " "
      })
    } else {
      var len = e.detail.value.length
      if (e.detail.value == "以上都没有") {
        this.setData({
          emr: this.data.emr + "否认花粉过敏史、螨虫过敏史、粉尘过敏史。"
        })
      } else {
        this.setData({
          emr: this.data.emr + e.detail.value[len - 1] + " "
        })
      }
    }
    console.log(this.data.emr)
  },
  addAller: function (e) {
    this.setData({
      addAller: e.detail.value
    })
  },
  okAddAller: function (e) {
    if (this.data.emr.indexOf("过敏史") != -1) {
      this.setData({
        emr: this.data.emr + this.data.addAller + "。"
      })
    } else {
      this.setData({
        emr: this.data.emr + "\n" + "过敏史：" + this.data.addAller + "。"
      })
    }
    wx.redirectTo({
      url: '../../pages/result/result?answers=' + this.data.answers + "&emr=" + this.data.emr + "&bansui=" + JSON.stringify(this.data.bansui)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      answers: options.answers,
      emr: options.emr,
      tihao: parseInt(options.tihao),
      bansui: JSON.parse(options.bansui),
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