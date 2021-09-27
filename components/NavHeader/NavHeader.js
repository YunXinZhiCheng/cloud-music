// components/NavHeader/NavHeader.js
Component({
  /**
   * 组件的属性列表: 由组件外部传入的数据，相当于Vue中的prop
   */
  properties: {
     title: {
       type: String, // 类型必须要写
       value: '我是title默认值'
     },
     nav: {
       type: String, // 类型必须要写
       value: '我是nav默认值'
     }
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

  }
})
