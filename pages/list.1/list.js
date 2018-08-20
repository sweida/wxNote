// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noteList: [
      {
        id: 1,
        text:
          '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 2,
        text:
          '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 3,
        text:
          '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 4,
        text:
          '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 5,
        text:
          '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 6,
        text:
          '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 7,
        text:
          '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
    ],
    editIndex: 0,
    delBtnWidth: 180, //删除按钮宽度单位（rpx）
  },

  detail() {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.initEleWidth()
    // if (!options.password) {
    //   wx.redirectTo({
    //     url: '../index/index',
    //   })
    // }
  },

  touchS: function(e) {
    console.log('touchS' + e)
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX,
      })
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function(e) {
    console.log('touchM:' + e)
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth
      var txtStyle = ''
      if (disX == 0 || disX < 0) {
        //如果移动距离小于等于0，文本层位置不变
        txtStyle = 'left:0px'
      } else if (disX > 0) {
        //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = 'left:-' + disX + 'px'
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = 'left:-' + delBtnWidth + 'px'
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index
      var list = that.data.noteList
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle
      //更新列表的状态
      this.setData({
        noteList: list,
      })
    }
  },
  touchE: function(e) {
    console.log('touchE' + e)
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX
      var delBtnWidth = that.data.delBtnWidth
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle =
        disX > delBtnWidth / 2 ? 'left:-' + delBtnWidth + 'px' : 'left:0px'
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index
      var list = that.data.noteList
      list[index].txtStyle = txtStyle
      //更新列表的状态
      that.setData({
        noteList: list,
      })
    }
  },

  getEleWidth: function(w) {
    var real = 0

    try {
      var res = wx.getSystemInfoSync().windowWidth
      var scale = 750 / 2 / (w / 2) //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale)
      return real
    } catch (e) {
      return false
      // Do something when catch error
    }
  },

  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth)
    this.setData({
      delBtnWidth: delBtnWidth,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
})
