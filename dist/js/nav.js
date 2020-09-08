//处理导航栏部分   AMD
define(["jquery"], function ($) {
  function download() {
    //数据下载
    $.ajax({
      type: "get",
      url: "../data/nav.json",
      success: function (result) {
        // alert(result);
        var bannerArr = result.banner;

        //通过循环将数据加载到页面上
        for (var i = 0; i < bannerArr.length; i++) {
          $(`<a href="${bannerArr[i].url}">
                  <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerArr[i].img}' alt=""/>
              </a>`).appendTo("#J_homeSwiper .swiper-slide");
          var node = $(` <a href="#" class = 'swiper-pagination-bullet'></a>`);
          if (i == 0) {
            node.addClass("swiper-pagination-bullet-active");
          }
          node.appendTo("#J_homeSwiper .swiper-pagination");
        }
      },
      error: function (msg) {
        console.log(msg);
      },
    });
  }

  //实现轮播效果
  function banner() {
    var iNow = 0;
    var aImgs = null;
    var aBtns = null;
    var timer = setInterval(function () {
      iNow++;
      tab();
    }, 2500);

    //封装切换函数
    function tab() {
      if (!aImgs) {
        aImgs = $("#J_homeSwiper .swiper-slide").find("a");
      }
      if (!aBtns) {
        aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
      }
      if (iNow == 5) {
        iNow = 0;
      }

      //图片切换
      aImgs
        .hide()
        .css("opacity", 0.2)
        .eq(iNow)
        .show()
        .animate({ opacity: 1 }, 500);
      //对应的小圆圈指定当前是哪张图片显示
      aBtns
        .removeClass("swiper-pagination-bullet-active")
        .eq(iNow)
        .addClass("swiper-pagination-bullet-active");
    }

    //添加移入移出
    $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next")
      .mouseenter(function () {
        clearInterval(timer);
      })
      .mouseleave(function () {
        timer = setInterval(function () {
          iNow++;
          tab();
        }, 2500);
      });

    //点击小圆点，切换图片   事件委托******
    $("#J_homeSwiper .swiper-pagination").on("click", "a", function () {
      // alert($(this).index());
      iNow = $(this).index();
      tab();
      return false; //阻止默认行为
    });
    //上下切换图片
    $(".swiper-button-prev,.swiper-button-next").on("click", function () {
      if (this.className == "swiper-button-prev") {
        iNow--;
        if (iNow == -1) {
          iNow = 4;
        }
      } else {
        iNow++;
      }
      tab();
    });
  }

  //侧边栏导航数据加载
  function leftNavDownload() {
    $.ajax({
      url: "../data/nav.json",
      success: function (data) {
        var sideArr = data.sideNav;
        // alert(sideArr);
        for (var i = 0; i < sideArr.length; i++) {
          var node = $(`<li class = 'category-item'>
          <a href="/index.html" class = 'title'>
              ${sideArr[i].title}
              <em class = 'iconfont-arrow-right-big'></em>
          </a>
          <div class="children clearfix ">

          </div>
      </li> `);
          node.appendTo("#J_categoryList");

          //取出当前对应子节点
          var childArr = sideArr[i].child;
          //列数
          var col = Math.ceil(childArr.length / 6);
          //根据列数设置class样式
          node.find("div.children").addClass("children-col-" + col);
          //循环创建右侧每一个数据
          for(var j = 0; j < childArr.length; j++){
            if(j % 6 == 0){
              var newUl = $(` <ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}">
              </ul>`);
              newUl.appendTo(node.find("div.children"));
            }
            $(`<li>
            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                <span class="text">${childArr[j].title}</span>
            </a>
        </li>`).appendTo(newUl);
          }
        }
      },
      error: function (msg) {
        console.log(msg);
      },
    });
  }

  //给侧边导航栏添加移入移出效果  (选项卡)
  //通过事件委托
  function leftNavTab(){
    $("#J_categoryList").on("mouseenter", ".category-item", function(){
      $(this).addClass("category-item-active");
    })
    $("#J_categoryList").on("mouseleave", "li.category-item", function(){
      $(this).removeClass("category-item-active");
    })
  }


  return {
    download: download,//导航栏部分 数据加载
    banner: banner,//轮播效果
    leftNavDownload: leftNavDownload,//侧边栏导航数据加载
    leftNavTab:leftNavTab,//侧边导航栏添加移入移出效果
  };
});
