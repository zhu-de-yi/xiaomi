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
    "nav":"nav"
  },
  shim:{
    //依赖关系
    "jquery-cookie": ["jquery"]
  }
})
require(["nav"], function(nav){
  nav.download();
  nav.banner();
  nav.leftNavDownload();
  nav.leftNavTab();
})
