//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    zz_textarea: '',
    emr: "", 
    wait_bansui: [],
    dis_list: ["急性病毒性咽炎", "急性病毒性喉炎", "普通感冒", "急性上呼吸道感染"],
    symptom_list: ["咽痛", "鼻塞", "喷嚏", "厌食", "咯血", "喘息", "发热", "体重下降", '呼吸困难', '咳痰', '咳嗽', "胸闷", "心悸", "头晕", "头痛", "恶心呕吐", '胸痛', "便秘", "腹痛", "多尿", "腹泻"]
  },

  reasonInput: function (res) {
    this.setData({
      zz_textarea: res.detail.value
    });
  },

  //事件处理函数
  ok_symptom: function () {
    // console.log(787878787878, this.data.zz_textarea)
    var list = this.data.zz_textarea.split("、")
    // console.log(969696969696, list)
    this.setData({
      emr: this.data.emr + "\n" + "自诉症状：" + this.data.zz_textarea + "。" + "伴有"
    })
    for (var i in list) {
      console.log("疾病列表： ", list[i]);
      // if (list[i] != "咽痛" && list[i] != "鼻塞" && list[i] != "喷嚏" && list[i] != "厌食" && list[i] != "咯血" && list[i] != "喘息" && list[i] != "发热" && list[i] != "体重下降" && list[i] != "呼吸困难" && list[i] != "咳痰" && list[i] != "咳嗽" && list[i] != "胸闷" && list[i] != "心悸" && list[i] != "头晕" && list[i] != "头痛" && list[i] != "恶心呕吐" && list[i] != "腹痛" && list[i] != "腹泻" && list[i] != "多尿" && list[i] != "便秘" && list[i] != "胸痛") {
      if((this.data.symptom_list.indexOf(list[i])) == -1) {
        if (list[i] == "急性病毒性咽炎" || list[i] == "急性病毒性喉炎" || list[i] == "急性上呼吸道感染" || list[i] == "普通感冒") {
          var that = this
          wx.request({
            url: 'http://127.0.0.1:5000/get_dis_symp/' + list[i],
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (res) {
              that.setData({
                wait_bansui: res.data.wait_bansui
              })
              wx.redirectTo({
                url: '../../pages/question/question?zz_textarea=' + that.data.zz_textarea + "&emr=" + that.data.emr 
                + "&wait_bansui=" + JSON.stringify(that.data.wait_bansui)
              })
              console.log('submit success');
            },
            fail: function (res) {
              console.log('submit fail');
            },
            complete: function (res) {
              console.log('submit complete');
            }
          })
        } else {
          var that = this
          wx.showModal({
            title: '错误',
            content: '请输入以下症状中的一种: 咽痛、鼻塞、喷嚏、厌食、咯血、喘息、发热、体重下降、呼吸困难、咳痰、咳嗽、胸闷、心悸、头晕、头痛、恶心呕吐、腹痛、腹泻、胸痛、便秘、多尿',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../symptom/symptom?emr=' + that.data.emr
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../symptom/symptom?emr=' + that.data.emr
                })
              }
            }
          })
        }
      } else {
        if (this.data.zz_textarea) {
          wx.redirectTo({
                url: '../../pages/question/question?zz_textarea=' + this.data.zz_textarea + "&emr=" + this.data.emr
              })
        }
        else {
          wx.navigateTo({
            url: '../index/index'
          })
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      emr: options.emr
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