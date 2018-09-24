
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    possible_dis: [], 
    answers: "",
    show: "",
    emr: "",
    disDetail: {},
    quezhen: "确诊需综合临床症状、X线检查、外周血象检查结果作出诊断",
    bansui: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      emr: options.emr
    })
    if (options.answers) {
      this.setData({
        answers: options.answers
      })
    }
    if (options.show) {
      this.setData({
        show: options.show
      })
    }
    if (options.bansui) {
      this.setData({
        bansui: JSON.parse(options.bansui)
      })
    } 

    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/get_disease/' + that.data.answers,
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log('submit success');
        that.setData({
          possible_dis: res.data.possible_dis,
        })
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })

    wx.request({
      url: 'http://127.0.0.1:5000/get_disease_dict/',
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log('submit success');
        that.setData({
          dict_dis: res.data.dict_dis,
        })
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },

  get_clinic_test: function(dis) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/get_clinical/' + dis,
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log('submit success');
        console.log(res.data)
        if (res.data) {
          that.setData({
            disDetail: res.data.clinique,
            quezhen: res.data.test
          })
        }
        // 处理 this.data.bansui并赋值给bansui， 是将this.data.bansui的所有子list合并并取出交集
        var bansui = []
        for (var item of that.data.bansui) {
          for (var sub_item of item) {
            if (bansui.indexOf(sub_item) == -1) {
              bansui.push(sub_item)
            }
          }
        }
        // console.log(9632145, bansui)
        for (var key in that.data.disDetail) {
          if (bansui.indexOf(key) != -1) {
            that.data.disDetail[key] = "true"
          }
        }
        that.setData({
          disDetail: that.data.disDetail
        })
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },

  onPickHeaderClick: function(e) {
    for (var item in this.data.dict_dis) {
      if (item.indexOf(e.currentTarget.id) != -1) {
        var temp = this.data.dict_dis;
        temp[item] = !this.data.dict_dis[item];
        this.setData({
          dict_dis: temp
        })
      } 
      // 这一个就先不实现了 否则需要去给2032个疾病去设置hiddenName， 就要进行2032次操作，影响了正在进行的其他必须响应
      // 这个else是为了在点击其中一个疾病时，将其他所有疾病的hiddenName设为tue，进而不显示所有其他的病的诊疗路径。
      // 现在就需要每次打开之后手动关掉之前需要浏览的内容
      // else {
      //   var temp = this.data.dict_dis;
      //   temp[item] = true;
      //   this.setData({
      //     dict_dis: temp
      //   })
      // }
    }
    this.get_clinic_test(e.currentTarget.id)
  },

  show_EMR: function() {
    var that = this
    console.log("this.data.emr: ", this.data.emr)
    wx.request({
      url: 'http://127.0.0.1:5000/gen_EMR/' + that.data.answers,
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log('submit success');
        that.setData({
          show: that.data.emr + "\n" + res.data
        })
        wx.redirectTo({
          url: '../../pages/EMR/EMR?show=' + that.data.show + "&disease=" + that.data.disease + "&answers=" + that.data.answers + "&emr=" +that.data.emr
        })
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
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