// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noteList: [
      {
        id: 1,
        text: '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 2,
        text: '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 3,
        text: '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 4,
        text: '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 5,
        text: '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 6,
        text: '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
      {
        id: 7,
        text: '这是记事本内容哈哈哈哈哈哈哈哈哈啊哈啊哈啊哈啊哈哈 啊哈 啊哈啊 啊',
        creatDate: '2018年08月20日',
      },
    ],
    startX: 0, //开始坐标
    startY: 0,
    isTouchMove: false,
    active: 'list'
  },

  detail(e) {
    console.log(this.data.isTouchMove, 2322)
    if(!this.data.isTouchMove) {
      wx.navigateTo({
        url: '../detail/detail',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // if (!options.password) {
    //   wx.redirectTo({
    //     url: '../index/index',
    //   })
    // }
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    let that = this
    that.data.noteList.forEach(function(v, i) {
      if (v.isTouchMove)
        //只操作为true的
        v.isTouchMove = false
        that.setData({
          isTouchMove: false
        })
        console.log(that.data.isTouchMove, 333)
    })
    that.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      noteList: this.data.noteList,
    })
  },

  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle(
        { X: startX, Y: startY },
        { X: touchMoveX, Y: touchMoveY },
      )
      console.log(startX, startY, touchMoveX, touchMoveY, angle )
    that.data.noteList.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return
      if (i == index) {
        //右滑
        if (touchMoveX > startX) {
          v.isTouchMove = false
          that.setData({
            isTouchMove: false
          })
        } else {
          //左滑
          v.isTouchMove = true
          that.setData({
            isTouchMove: true
          })
        }
      }
    })
    //更新数据
    that.setData({
      noteList: that.data.noteList,
    })
  },

  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function(start, end) {
    var _X = end.X - start.X,
    _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI)
  },

  // 删除事件
  delItem(e) {
    let that = this
    wx.showActionSheet({
      itemList: ['删除该笔记'],
      itemColor: '#ff3939',
      success: function(res) {
        that.data.noteList.splice(e.currentTarget.dataset.index, 1)
        that.setData({
          noteList: that.data.noteList
        })
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
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
