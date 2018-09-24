
//获取应用实例
const app = getApp() 

// 回答一个问题就更改一次emr的值

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexuality: [
      { name: "女", value: "女" },
      { name: "男", value: "男" }
    ], 
    ages: [
      { name: "0-6岁", value: "0-6岁"},
      { name: "7-15岁", value: "7-15岁"},
      { name: "16-35岁", value: "16-35岁"},
      { name: "36-60岁", value: "36-60岁"},
      { name: "大于60岁", value: "大于60岁"}
    ],
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
  // 性别选项处理
  radioChangeSex: function(e) {
    this.setData({
      emr: this.data.emr + "性别：" + e.detail.value + "\n"
    })
    console.log(this.data.emr)
  }, 
// 年龄选项处理
  radioChangeAge: function(e) {
    this.setData({
      emr: this.data.emr + "年龄：" + e.detail.value 
      // + "\n" + "既往病史："
    })
    console.log(this.data.emr)
  },
// // 既往病史处理
//   checkboxChangePastDis: function (e) {
//     var len = e.detail.value.length
//     if (e.detail.value == "都没有") {
//       this.setData({
//         emr: this.data.emr + "否认高血压史、心肌梗死病史、糖尿病史、急性肾炎病史、心绞痛史."
//       })
//     } else if (e.detail.value == "不清楚") {
//       this.setData({
//         emr: this.data.emr + "不确定是否患有高血压史、心肌梗死病史、糖尿病史、急性肾炎病史、心绞痛史."
//       })
//     } else {
//       this.setData({
//         emr: this.data.emr + e.detail.value[len - 1] + " "
//       })
//     }
//     console.log(this.data.emr)
//   },
//   addpastdis: function(e) {
//     this.setData({
//       addPast: e.detail.value
//     })
//   },
//   okAddPast: function(e) {
//     this.setData({
//       emr: this.data.emr + this.data.addPast
//     })
//     console.log(this.data.emr)
//   }, 
// // 过敏史处理
//   checkboxChangeAller: function(e) {
//     console.log(e.detail.value)
//     if (this.data.emr.indexOf("过敏史") == -1) {
//       this.setData({
//         emr: this.data.emr + "\n" + "过敏史：" + e.detail.value + " "
//       })
//     } else {
//       var len = e.detail.value.length
//       if (e.detail.value == "以上都没有") {
//         this.setData({
//           emr: this.data.emr + "否认花粉过敏史、螨虫过敏史、粉尘过敏史."
//         })
//       } else {
//         this.setData({
//           emr: this.data.emr + e.detail.value[len - 1] + " "
//         })
//       }
//     }
//     console.log(this.data.emr)
//   },

//   addAller: function(e) {
//     this.setData({
//       addAller: e.detail.value
//     })
//   },
//   okAddAller: function(e) {
//     if (this.data.emr.indexOf("过敏史") != -1) {
//       this.setData({
//         emr: this.data.emr + this.data.addAller
//       })
//     } else {
//       this.setData({
//         emr: this.data.emr + "\n" + "过敏史：" + this.data.addAller
//       })
//     }
    
//     console.log(this.data.emr)
//   },

  //事件处理函数
  ok_symptom: function () {
      wx.redirectTo({
        url: '../../pages/symptom/symptom?emr=' + this.data.emr
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     emr: this.data.emr
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