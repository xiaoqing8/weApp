
//获取应用实例
const app = getApp()
/* 咽痛、鼻塞、喷嚏、厌食、咯血、喘息、发热、体重下降、呼吸困难、咳痰、咳嗽、胸闷、心悸、头晕、头痛、恶心呕吐、胸痛、便秘、腹痛、多尿、腹泻 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zz_textarea: "",
    question: [],
    index: 1,
    realIndex: 1,
    optionA: "A",
    optionB: "B",
    optionC: "C",
    optionD: "D",
    optionE: "E",
    optionF: "F",
    optionG: "G",
    optionH: "H",
    questionDetail: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    answerE: "",
    answerF: "",
    answerG: "",
    answerH: "",
    answers: "", 
    tihao: 4, 
    temp: true, 
    wait_zz: "",
    bansui: [],
    m: 0,
    // suggest_list: ['咳痰','发热', '咳嗽', '胸闷', '头痛', '体重下降', '喘息', '喷嚏', '鼻塞', '咽痛', '呼吸困难'],
    // before_list: ["急性病毒性喉炎", "急性病毒性咽炎", "普通感冒", "慢性阻塞性肺疾病", "慢性支气管炎"] 
    before_list: ["急性病毒性喉炎", "急性病毒性咽炎", "普通感冒", "急性上呼吸道感染"],
    suggest_list: ["鼻腔黏膜充血", "鼻腔黏膜水肿", "鼻腔黏膜有分泌物", "白细胞正常或偏低", "淋巴细胞比例升高", "白细胞增多", "中性粒细胞增多", "核左移", '咳痰', '发热', '咳嗽', "呼吸不畅", "咽部有灼热感", "轻度畏寒", "流涕", "味觉迟钝", '胸闷', "鼻后滴漏", "流泪", "头痛", "咽干", "喉部水肿", "淋巴细胞比例升高", "白细胞正常或偏低", "喉部有喘息声", "局部淋巴结触痛", "局部淋巴结肿大", "咽痒", "声音嘶哑", "喉部充血", "讲话困难", "白细胞正常或偏低", "流稠涕", '体重下降', '喘息', '喷嚏', '鼻塞', '咽痛', '呼吸困难'],
  },


  get_answers: function (i, index, reponse) {
    this.setData({
      answers: this.data.answers + this.data.question[i][index].question + " " + reponse
    })
  },
  
  clickCommon: function(i, realIndex) {
    this.setData({
      questionDetail: this.data.question[i][realIndex].question,
      answerA: this.data.question[i][realIndex].option.A,
      answerB: this.data.question[i][realIndex].option.B,
    })

    if (this.data.question[i][realIndex].option.C) {
      this.setData({ answerC: this.data.question[i][realIndex].option.C })
    } else {
      this.setData({ answerC: "" })
    }
    if (this.data.question[i][realIndex].option.D) {
      this.setData({ answerD: this.data.question[i][realIndex].option.D })
    } else {
      this.setData({ answerD: "" })
    }
    if (this.data.question[i][realIndex].option.E) {
      this.setData({ answerE: this.data.question[i][realIndex].option.E })
    } else {
      this.setData({ answerE: "" })
    }
    if (this.data.question[i][realIndex].option.F) {
      this.setData({ answerF: this.data.question[i][realIndex].option.F })
    } else {
      this.setData({ answerF: "" })
    }
    if (this.data.question[i][realIndex].option.G) {
      this.setData({ answerG: this.data.question[i][realIndex].option.G })
    } else {
      this.setData({ answerG: "" })
    }
    if (this.data.question[i][realIndex].option.H) {
      this.setData({ answerH: this.data.question[i][realIndex].option.H })
    } else {
      this.setData({ answerH: "" })
    }
  }, 
  
  get_zz: function (answers, suggest_list, before_list, bansui) {
    console.log("answers ", answers)
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/get_bansui/' + that.data.answers,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({
          wait_bansui_list: res.data,
          wait_bansui: res.data.wait_bansui_1
        })
        // console.log(95969696959595, that.data.wait_bansui.length)
        console.log('submit success');
        // console.log(5656565656, that.data.wait_bansui_list)
        wx.redirectTo({
          url: '../../pages/bansui_new/bansui_new?answers=' + that.data.answers + "&emr=" + that.data.emr + "&tihao=" + that.data.tihao + "&zz_textarea=" + that.data.zz_textarea + "&wait_bansui=" + JSON.stringify(that.data.wait_bansui) + "&wait_bansui_list=" + JSON.stringify(that.data.wait_bansui_list)
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

  answerClickA: function () {
    this.setData({
      tihao: this.data.tihao + 1
    })
    // console.log('this.data.l: ', this.data.l)
    if (this.data.m < this.data.l) {
      // console.log("this.data.question[0].length: ", this.data.question[0].length)
      if (this.data.index < this.data.question[this.data.m].length) {
        // console.log("i in if: ", this.data.index)
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.A);
        this.setData({
          answers: this.data.answers + ";"
        })
        // console.log("this.data.answers", this.data.answers)
        this.setData({
          index: this.data.index + 1,
          realIndex: this.data.index,
        })
        this.clickCommon(i, this.data.realIndex)
        // console.log("this.data.answers in question.js: " + this.data.answers)
      } else if (this.data.index == this.data.question[this.data.m].length && this.data.m < this.data.l - 1) {
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.A);
        this.setData({
          answers: this.data.answers + "。"
        })
        // console.log("this.data.answers", this.data.answers)
        // this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
        this.setData({
          index: 0,
          m: this.data.m + 1
        })
        var i = this.data.m
        // console.log(65656565, i)
        // console.log(65656565, this.data.index) 
        this.clickCommon(i, this.data.index)
        this.setData({
          index: this.data.index + 1
        })
        // console.log("this.data.answers in question.js: " + this.data.answers)
        // console.log('la fin: ', this.data.index , this.data.question[this.data.m].length)
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 9000)
        this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
      }
    } 
  },

  answerClickB: function () {
    this.setData({
      tihao: this.data.tihao + 1
    })
    if (this.data.m < this.data.l) {
      // console.log("this.data.question[0].length: ", this.data.question[0].length)
      if (this.data.index < this.data.question[this.data.m].length) {
        // console.log("i in if: ", this.data.index)
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.B);
        this.setData({
          answers: this.data.answers + ";"
        })
        // console.log("this.data.answers", this.data.answers)
        this.setData({
          index: this.data.index + 1,
          realIndex: this.data.index,
        })
        this.clickCommon(i, this.data.realIndex)
        // console.log("this.data.answers in question.js: " + this.data.answers)
      } else if (this.data.index == this.data.question[this.data.m].length && this.data.m < this.data.l - 1) {
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.B);
        this.setData({
          answers: this.data.answers + "。"
        })
        // console.log("this.data.answers", this.data.answers)
        // this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
        this.setData({
          index: 0,
          m: this.data.m + 1
        })
        var i = this.data.m
        // console.log(65656565, i)
        // console.log(65656565, this.data.index)
        this.clickCommon(i, this.data.index)
        this.setData({
          index: this.data.index + 1
        })
        // console.log("this.data.answers in question.js: " + this.data.answers)
        // console.log('la fin: ', this.data.index, this.data.question[this.data.m].length)
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 9000)
        this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
      }
    }
  },

  answerClickC: function () {
    this.setData({
      tihao: this.data.tihao + 1
    })
    if (this.data.m < this.data.l) {
      // console.log("this.data.question[0].length: ", this.data.question[0].length)
      if (this.data.index < this.data.question[this.data.m].length) {
        // console.log("i in if: ", this.data.index)
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.C);
        this.setData({
          answers: this.data.answers + ";"
        })
        // console.log("this.data.answers", this.data.answers)
        this.setData({
          index: this.data.index + 1,
          realIndex: this.data.index,
        })
        this.clickCommon(i, this.data.realIndex)
        // console.log("this.data.answers in question.js: " + this.data.answers)
      } else if (this.data.index == this.data.question[this.data.m].length && this.data.m < this.data.l - 1) {
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.C);
        this.setData({
          answers: this.data.answers + "。"
        })
        // console.log("this.data.answers", this.data.answers)
        // this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
        this.setData({
          index: 0,
          m: this.data.m + 1
        })
        var i = this.data.m
        // console.log(65656565, i)
        // console.log(65656565, this.data.index)
        this.clickCommon(i, this.data.index)
        this.setData({
          index: this.data.index + 1
        })
        // console.log("this.data.answers in question.js: " + this.data.answers)
        // console.log('la fin: ', this.data.index, this.data.question[this.data.m].length)
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 9000)
        this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
      }
    }    
  },

  answerClickD: function () {
    this.setData({
      tihao: this.data.tihao + 1
    })
    if (this.data.m < this.data.l) {
      // console.log("this.data.question[0].length: ", this.data.question[0].length)
      if (this.data.index < this.data.question[this.data.m].length) {
        // console.log("i in if: ", this.data.index)
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.D);
        this.setData({
          answers: this.data.answers + ";"
        })
        // console.log("this.data.answers", this.data.answers)
        this.setData({
          index: this.data.index + 1,
          realIndex: this.data.index,
        })
        this.clickCommon(i, this.data.realIndex)
        // console.log("this.data.answers in question.js: " + this.data.answers)
      } else if (this.data.index == this.data.question[this.data.m].length && this.data.m < this.data.l - 1) {
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.D);
        this.setData({
          answers: this.data.answers + "。"
        })
        // console.log("this.data.answers", this.data.answers)
        // this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
        this.setData({
          index: 0,
          m: this.data.m + 1
        })
        var i = this.data.m
        // console.log(65656565, i)
        // console.log(65656565, this.data.index)
        this.clickCommon(i, this.data.index)
        this.setData({
          index: this.data.index + 1
        })
        // console.log("this.data.answers in question.js: " + this.data.answers)
        // console.log('la fin: ', this.data.index, this.data.question[this.data.m].length)
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 9000)
        this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
      }
    }
  },

  answerClickE: function () {
    this.setData({
      tihao: this.data.tihao + 1
    })
    if (this.data.m < this.data.l) {
      // console.log("this.data.question[0].length: ", this.data.question[0].length)
      if (this.data.index < this.data.question[this.data.m].length) {
        // console.log("i in if: ", this.data.index)
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.E);
        this.setData({
          answers: this.data.answers + ";"
        })
        // console.log("this.data.answers", this.data.answers)
        this.setData({
          index: this.data.index + 1,
          realIndex: this.data.index,
        })
        this.clickCommon(i, this.data.realIndex)
        // console.log("this.data.answers in question.js: " + this.data.answers)
      } else if (this.data.index == this.data.question[this.data.m].length && this.data.m < this.data.l - 1) {
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.E);
        this.setData({
          answers: this.data.answers + "。"
        })
        // console.log("this.data.answers", this.data.answers)
        // this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
        this.setData({
          index: 0,
          m: this.data.m + 1
        })
        var i = this.data.m
        // console.log(65656565, i)
        // console.log(65656565, this.data.index)
        this.clickCommon(i, this.data.index)
        this.setData({
          index: this.data.index + 1
        })
        // console.log("this.data.answers in question.js: " + this.data.answers)
        // console.log('la fin: ', this.data.index, this.data.question[this.data.m].length)
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 9000)
        this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
      }
    }
  },

  answerClickF: function () {
    this.setData({
      tihao: this.data.tihao + 1
    })
    if (this.data.m < this.data.l) {
      // console.log("this.data.question[0].length: ", this.data.question[0].length)
      if (this.data.index < this.data.question[this.data.m].length) {
        // console.log("i in if: ", this.data.index)
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.F);
        this.setData({
          answers: this.data.answers + ";"
        })
        // console.log("this.data.answers", this.data.answers)
        this.setData({
          index: this.data.index + 1,
          realIndex: this.data.index,
        })
        this.clickCommon(i, this.data.realIndex)
        // console.log("this.data.answers in question.js: " + this.data.answers)
      } else if (this.data.index == this.data.question[this.data.m].length && this.data.m < this.data.l - 1) {
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.F);
        this.setData({
          answers: this.data.answers + "。"
        })
        // console.log("this.data.answers", this.data.answers)
        // this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
        this.setData({
          index: 0,
          m: this.data.m + 1
        })
        var i = this.data.m
        // console.log(65656565, i)
        // console.log(65656565, this.data.index)
        this.clickCommon(i, this.data.index)
        this.setData({
          index: this.data.index + 1
        })
        // console.log("this.data.answers in question.js: " + this.data.answers)
        // console.log('la fin: ', this.data.index, this.data.question[this.data.m].length)
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 9000)
        this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
      }
    }
  },

  answerClickG: function () {
    this.setData({
      tihao: this.data.tihao + 1
    })
    if (this.data.m < this.data.l) {
      // console.log("this.data.question[0].length: ", this.data.question[0].length)
      if (this.data.index < this.data.question[this.data.m].length) {
        // console.log("i in if: ", this.data.index)
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.G);
        this.setData({
          answers: this.data.answers + ";"
        })
        // console.log("this.data.answers", this.data.answers)
        this.setData({
          index: this.data.index + 1,
          realIndex: this.data.index,
        })
        this.clickCommon(i, this.data.realIndex)
        // console.log("this.data.answers in question.js: " + this.data.answers)
      } else if (this.data.index == this.data.question[this.data.m].length && this.data.m < this.data.l - 1) {
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.G);
        this.setData({
          answers: this.data.answers + "。"
        })
        // console.log("this.data.answers", this.data.answers)
        // this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
        this.setData({
          index: 0,
          m: this.data.m + 1
        })
        var i = this.data.m
        // console.log(65656565, i)
        // console.log(65656565, this.data.index)
        this.clickCommon(i, this.data.index)
        this.setData({
          index: this.data.index + 1
        })
        // console.log("this.data.answers in question.js: " + this.data.answers)
        // console.log('la fin: ', this.data.index, this.data.question[this.data.m].length)
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 9000)
        this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
      }
    }   
  },

  answerClickH: function () {
    this.setData({
      tihao: this.data.tihao + 1
    })
    if (this.data.m < this.data.l) {
      // console.log("this.data.question[0].length: ", this.data.question[0].length)
      if (this.data.index < this.data.question[this.data.m].length) {
        // console.log("i in if: ", this.data.index)
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.H);
        this.setData({
          answers: this.data.answers + ";"
        })
        // console.log("this.data.answers", this.data.answers)
        this.setData({
          index: this.data.index + 1,
          realIndex: this.data.index,
        })
        this.clickCommon(i, this.data.realIndex)
        // console.log("this.data.answers in question.js: " + this.data.answers)
      } else if (this.data.index == this.data.question[this.data.m].length && this.data.m < this.data.l - 1) {
        var i = this.data.m
        var xuhao = this.data.index - 1
        this.get_answers(i, xuhao, this.data.question[i][xuhao].option.H);
        this.setData({
          answers: this.data.answers + "。"
        })
        // console.log("this.data.answers", this.data.answers)
        // this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
        this.setData({
          index: 0,
          m: this.data.m + 1
        })
        var i = this.data.m
        // console.log(65656565, i)
        // console.log(65656565, this.data.index)
        this.clickCommon(i, this.data.index)
        this.setData({
          index: this.data.index + 1
        })
        // console.log("this.data.answers in question.js: " + this.data.answers)
        // console.log('la fin: ', this.data.index, this.data.question[this.data.m].length)
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 9000)
        this.get_zz(this.data.answers, this.data.suggest_list, this.data.before_list, this.data.bansui)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wait_zz: this.data.wait_zz
    })
    this.setData({
      zz_textarea : options.zz_textarea,
      emr: options.emr,
    })
    if (options.wait_bansui) {
      this.setData({
        wait_bansui: JSON.parse(options.wait_bansui)
      })
    }
    if(options.suggest_list) {
      this.setData({
        suggest_list: options.suggest_list.split(',')
      })
    } else {
      this.setData({
        suggest_list: this.data.suggest_list
      })
    }
    if(options.before_list) {
      this.setData({
        before_list: options.before_list.split(',')
      })
    } else {
      this.setData({
        before_list: this.data.before_list
      })
    }
    if(options.answers) {
      this.setData({
        answers: options.answers + this.data.zz_textarea + "@"
      })
    } else {
      this.setData({
        answers: this.data.answers + this.data.zz_textarea + "@"
    })
    }
    if(options.tihao){
      this.setData({
        tihao: parseInt(options.tihao) + 1
      })
    } else {
      this.setData({
        tihao: this.data.tihao
      })
    }
    var list = this.data.zz_textarea.split("、")
    for (var i in list) {
      if (list[i] == "头痛") {
        this.data.question.push(app.globalData.question_toutong)
      } else if (list[i] == "咳嗽") {
        this.data.question.push(app.globalData.question_kesou)
      } else if (list[i] == "头晕") {
        this.data.question.push(app.globalData.question_touyun)
      } else if (list[i] == "心悸") {
        this.data.question.push(app.globalData.question_xinji)
      } else if (list[i] == "胸闷") {
        this.data.question.push(app.globalData.question_xiongmen)
      } else if (list[i] == "咳痰") {
        this.data.question.push(app.globalData.question_ketan)
      } else if (list[i] == "呼吸困难") {
        this.data.question.push(app.globalData.question_hxkn)
      } else if (list[i] == "体重下降") {
        this.data.question.push(app.globalData.question_tzxj)
      } else if (list[i] == "发热") {
        this.data.question.push(app.globalData.question_fare)
      } else if (list[i] == "喘息") {
        this.data.question.push(app.globalData.question_chuanxi)
      } else if (list[i] == "咯血") {
        this.data.question.push(app.globalData.question_kaxie)
      } else if (list[i] == "厌食") {
        this.data.question.push(app.globalData.question_yanshi)
      } else if (list[i] == "喷嚏") {
        this.data.question.push(app.globalData.question_penti)
      } else if (list[i] == "鼻塞") {
        this.data.question.push(app.globalData.question_bisai)
      } else if (list[i] == "咽痛") {
        this.data.question.push(app.globalData.question_yantong)
      } else if (list[i] == "恶心呕吐") {
        this.data.question.push(app.globalData.question_exot)
      } else if (list[i] == "腹泻") {
        this.data.question.push(app.globalData.question_fuxie)
      } else if (list[i] == "多尿") {
        this.data.question.push(app.globalData.question_duoniao)
      } else if (list[i] == "胸痛") {
        this.data.question.push(app.globalData.question_xiongtong)
      } else if (list[i] == "便秘") {
        this.data.question.push(app.globalData.question_bianmi)
      } else if (list[i] == "腹痛") {
        this.data.question.push(app.globalData.question_futong)
      } else {
        wx.showModal({
          title: '错误',
          content: '请输入以下症状中的一种: 咽痛、鼻塞、喷嚏、厌食、咯血、喘息、发热、体重下降、呼吸困难、咳痰、咳嗽、胸闷、心悸、头晕、头痛、恶心呕吐、腹痛、腹泻、多尿、胸痛、便秘',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../symptom/symptom'
              })
            } else if (res.cancel) {
              wx.navigateTo({
                url: '../symptom/symptom'
              })
            }
          }
        })
        this.setData({
          temp: false
        })
      }
    }

    console.log(this.data.temp)
    if (this.data.temp) {
      this.setData({
        l: this.data.question.length
      })
      this.setData({
        questionDetail: this.data.question[0][0].question,
        answerA: this.data.question[0][0].option.A,
        answerB: this.data.question[0][0].option.B
      })
      if (this.data.question[0][0].option.C) {
        this.setData({
          answerC: this.data.question[0][0].option.C,
        })
      }
      if (this.data.question[0][0].option.D) {
        this.setData({
          answerD: this.data.question[0][0].option.D,
        })
      }
      if (this.data.question[0][0].option.E) {
        this.setData({
          answerE: this.data.question[0][0].option.E,
        })
      }
      if (this.data.question[0][0].option.F) {
        this.setData({
          answerF: this.data.question[0][0].option.F,
        })
      }
      if (this.data.question[0][0].option.G) {
        this.setData({
          answerG: this.data.question[0][0].option.G,
        })
      }
      if (this.data.question[0][0].option.H) {
        this.setData({
          answerH: this.data.question[0][0].option.H,
        })
      }
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