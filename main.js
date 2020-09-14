console.log("加载成功");
/*
配置模块
遵从AMD规范
.js文件可以省略
*/
require.config({
  paths: {
    "jquery": "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    "nav":"nav",
    "slide":"slide",
    "data":"data"

  },
  shim:{
    //依赖关系
    "jquery-cookie": ["jquery"]
  }
})
require(["nav","slide","data"], function(nav,slide,data){
  nav.download();
  nav.banner();
  nav.leftNavDownload();
  nav.leftNavTab();
  nav.topNavDownload();
  nav.topNavTab();
  nav.searchTab();
  nav.allGoodsTab();

  // // 商品列表数据加载
  slide.download();
  // //添加商品数据滚动效果
  slide.slideTab();
  // //倒计时效果
  slide.countDown();

  data.download();
  data.tabMenu();

})
