/*
 * @Author: shichuyu
 * @Date: 2020-03-13 15:56:45
 * @LastEditors: shichuyu
 * @LastEditTime: 2020-03-16 14:47:34
 * @Description: 增加一个配置文件，业务通过设置 true 或 false 来选出自己需要的功能，我们再根据配置文件的内容，为每个业务生成相应的 html 文件
 */
//public/config.js 除了以下的配置之外，这里面还可以有许多其他配置，例如,pulicPath 的路径等等
module.exports = {
  dev: {
    template: {
      title: '瓜扑',
      header: false,
      footer: false,
      text: '天宇无敌'
    }
  },
  build: {
    template: {
      title: '瓜扑啊里啊',
      header: true,
      footer: false,
      text: '天宇无敌'
    }
  }
}