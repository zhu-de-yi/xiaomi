console.log("加载完成");
/*
    配置当前项目引入的模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        //引入banner图效果
        "nav": "nav",
        "goodsDesc": "goodsDesc"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})

require(["nav", "goodsDesc"], function(nav, goodsDesc){
    nav.topNavDownload();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();
    //侧边栏加载
    nav.leftNavDownload();
    //给侧边栏添加移入移出效果
    nav.leftNavTab();

    //获取当前加载的商品详情数据
    goodsDesc.download();
    goodsDesc.banner();

})
