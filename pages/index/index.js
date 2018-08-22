//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isfingerPrint: false, //可否使用指纹识别  默认false
    isfacial: false, //可否使用人脸识别  默认false
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    }

    var that = this
    //查看支持的生物认证   比如ios的指纹识别   安卓部分机器是不能用指纹识别的
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        console.log(res.supportMode, 42332)
        for (var i in res.supportMode) {
          if (res.supportMode[i] == 'fingerPrint') {
            console.log('支持指纹识别', res.supportMode[i])
            that.setData({
              isfingerPrint: true,
            })

            wx.startSoterAuthentication({
              requestAuthModes: ['fingerPrint'],
              challenge: '123456',
              authContent: '通过验证手机指纹解锁',
              success (res) {
                console.log('识别成功', res)
                wx.redirectTo({
                  url: '../list/list?password=true',
                })
              },
            })
            
          } else if (res.supportMode[i] == 'facial') {
            console.log('支持人脸识别', res.supportMode[i])
          } else {
            console.log('不支持指纹识别和人脸识别')
          }
        }
      },
    })
    // this.FingerPrint()
  },

  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true,
  //   })
  // },
  getUserInfo: function(e) {
    console.log(e)
    if(e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }else {
      wx.showToast({
        icon: 'none',
        title: '请授权后再使用',
      })
      wx.navigateBack({
        delta: -1
      })
    }
  },
  //是否可以指纹识别
  checkIsFingerPrint: function() {
    var boole = this.data.isfingerPrint
    var txt = '不可以使用指纹识别'
    if (boole) {
      txt = '可以使用指纹识别'
    }
    show('提示', txt, false)
  },
  //是否可以人脸识别
  checkIsFacial: function() {
    var boole = this.data.isfacial
    var txt = '不可以使用人脸识别'
    if (boole) {
      txt = '可以使用人脸识别'
    }
    // function SUCC() {
    //   console.log("用户点击确定")
    // }
    // function FAIL() {
    //   console.log("用户点击取消")
    // }
    show('提示', txt, false)
  },

  //进行指纹识别fingerPrint, 人脸识别facial
  FingerPrint: function() {
    if (this.data.isfingerPrint) {
      wx.startSoterAuthentication({
        requestAuthModes: ['fingerPrint'],
        challenge: '123456',
        authContent: '通过验证手机指纹解锁',
        success(res) {
          console.log('识别成功', res)
          wx.redirectTo({
            url: '../list/list?password=true',
          })
        },
      })
    } else {
      show('提示', '该手机不支持指纹识别', false)
    }
    // fail(res){
    //   // console.log("识别失败",res)
    //   // show("提示", "识别失败", false);
    // }
  },

  FingerPrint2() {
    wx.redirectTo({
      url: '../list/list',
    })
  },
  //是否有指纹
  HaveFingerPrint: function() {
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode: 'fingerPrint',
      success(res) {
        if (res.isEnrolled == 1) {
          show('提示', '有指纹', false)
        } else if (res.isEnrolled == 0) {
          show('提示', '无指纹', false)
        }
      },
      fail(res) {
        show('提示', '异常', fail)
      },
    })
  },
})

/**
 * 显示提示信息
 * tit 提示的标题
 * msg 提示的内容
 * q   是否有取消按钮（布尔值）
 * succ 用户点击确定的回调（非必须）
 * fail 用户点击取消的回调（非必须）
 *
 */
function show(tit, msg, q, succ, fail) {
  wx.showModal({
    title: tit,
    content: msg,
    showCancel: q,
    success: function(res) {
      if (res.confirm) {
        if (succ) {
          succ()
        }
      } else if (res.cancel) {
        if (fail) {
          fail()
        }
      }
    },
  })
}
