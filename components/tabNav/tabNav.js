// components/tabNav/tabNav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: String
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goTab(e) {
      let route = e.currentTarget.dataset.route
      wx.redirectTo({
        url: '../'+route+'/'+route
      })
    },
    addNote() {
      wx.navigateTo({
        url: '../detail/detail'
      })
    },
  }
})
