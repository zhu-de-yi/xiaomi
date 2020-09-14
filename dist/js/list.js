console.log("加载完成");
/*
    配置当前项目引入的模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",

        //引入banner图效果
        "nav": "nav",
        "goodsList": "goodsList"
    },

})

require(["nav","goodsList"], function(nav,goodsList){
    nav.topNavDownload();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();
    // //侧边栏加载
    nav.leftNavDownload();
    // //给侧边栏添加移入移出效果
    nav.leftNavTab();

    //加载列表商品
    goodsList.download();
    goodsList.banner();

})
