// ==UserScript==
// @name         CSDN净化
// @namespace    http://tampermonkey.net/
// @version      0.5.2
// @description  fuck you csdn!
// @author       Sanders
// @match        *://*.csdn.net/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 背景调成深色，看起来更舒适
    $("body").css("background-color", "dimgray");


    // 删除侧边栏热门文章
    var hotArticle = document.getElementById("asideHotArticle");
    if (hotArticle != null) {
        hotArticle.remove();
    }

    // 直接删除傻逼左侧边栏
    const sideBar = document.getElementsByClassName("blog_container_aside")[0]
    if (sideBar != null) {
        sideBar.remove();
    }

    // 删除右侧边栏
    const rightSideBar = document.getElementById("rightAside");
    if (rightSideBar != null) {
        rightSideBar.remove();
    }

    // 让文章居中全宽
    var mainBox = document.querySelector('#mainBox>main');
    if (mainBox != null) {
        mainBox.style.width = '75%';
        mainBox.style.float = "none";
        mainBox.style.marginLeft = "12.5%";
        // 调整图片比例
        $("#content_views img").css("max-width", "65%");
        $("#content_views img").css("margin-left", "22.5%");
    }


    // 将底部的作者栏调小
    var bottomBar = document.getElementsByClassName("left-toolbox")[0]
    if (bottomBar != null) {
        bottomBar.style.height = "10px";
    }

    // 边栏移到底部去
    // document.getElementsByClassName("blog_container_aside")[0].style.display = "contents"

    // 删除所有download的链接(仅适用于blog.csdn.net)
    var downloads = document.getElementsByClassName("recommend-item-box type_download");
    // 反着删才管用
    for(var i=downloads.length - 1; i >= 0; i--){
        if (downloads[i] != null) {
            downloads[i].remove();
        }
    }


    // 删除所有download.csdn.net的链接
    setTimeout(function() {

        var downloads2 = document.querySelectorAll("div[data-type=download]");
        for(i=downloads2.length - 1; i >= 0; i--){
            if (downloads2[i] != null) {
                downloads2[i].remove();
            }
        }


        var allLinks = document.getElementsByTagName("a");
        var downloadReg = RegExp(/download.csdn.net/);
        for (i = allLinks.length - 1; i >= 0; i--) {
            const link = allLinks[i].href;
            if (link.match(downloadReg)) {
                // 为了判断是不是导航栏的下载按钮，如果删了会导致导航栏错位，很蠢
                if (allLinks[i].parentElement.title != "获取源码、文档、学习资源") {
                    allLinks[i].remove();
                }
                //allLinks[i].remove();
            }
        }
    }, 1000);

    // 针对blink.csdn.net页面调整
    // 调整版面
    $(".blink-main-l").css("width", "70%");
    $(".blink-main-l").css("margin-left", "15%");
    $(".blink-main-l").css("margin-right", "0");
    // 移除右边的个人栏
    $(".blink-main-r").remove();


    // 针对bbs.csdn.net页面调整
    $(".user-right-floor").remove();
    $(".detail-container").css("margin-left", "15%");


    window.onload = function () {

        // 删除顶栏广告
        var adTime = 10;
        var adBar = setInterval(removeAdBar, 1000);
        function removeAdBar() {

            var adBar = document.getElementsByClassName("toolbar-advert")[0];
            if (adBar != null) {
                adBar.remove();
                clearInterval(adBar);
            }
            if (time == 10) {
                clearInterval(adBar);
            }
            time++;

        }


        // 删除其他广告(针对CSDN主页)
        $("[id^=kp_box]").remove();
        $("[class*=advert-box]").remove(); // 会导致顶栏错位

        // 删除学生认证
        var highschool = document.getElementById("csdn-highschool-window");
        if (highschool != null) {
            highschool.remove();
        }

        // 删除右下角的圆形广告
        var toolbar = document.getElementsByClassName("csdn-side-toolbar")[0];
        if (toolbar != null) {
            toolbar.remove();
        }
        var logo_ad = document.getElementsByClassName("csdn-common-logo-advert")[0];
        if (logo_ad != null) {
            logo_ad.remove();
        }

        // 删除Logo（经常Logo会变成广告动画）
        var logo = document.getElementsByClassName("toolbar-logo")[0];
        if (logo != null) {
            logo.remove();
        }

        // 顶部左侧 height: 100% 会错位，换成auto就好了
        var tool_bar = document.getElementsByClassName("toolbar-menus")[0];
        if (tool_bar != null) {
            tool_bar.style.height = "auto";
        }


        // 删除vip弹窗广告
        var vip = $(".mask")[0]
        if (vip != null) {
            vip.remove();
        }

        // 删除红包雨
        // 每0.5秒检测一次，持续检测4次，有时候网速问题加载会延时
        var redTime = 0;
        var redPocket = setInterval(deleteRedPocket, 500);
        function deleteRedPocket() {
            var redPocketLayer = document.getElementById("csdn-redpack");
            if (redPocketLayer != null) {
                redPocketLayer.remove();
                clearInterval(redPocket);
            }
            if (redTime == 4) {
                clearInterval(redPocket);
            }
            redTime++;
        }

        // 删除会员组合券广告弹窗
        var buysideTime = 0;
        var buyside = setInterval(deleteBuyside, 500);
        function deleteBuyside() {
            var buysideLayer = document.getElementByClassName("csdn-buyside-entry-box")[0];
            if (buysideLayer != null) {
                buysideLayer.remove();
                clearInterval(buyside);
            }
            if (redTime == 4) {
                clearInterval(buyside);
            }
            buysideTime++;
        }



        // 删除登录弹窗
        // 每1秒检测一次，持续检测10次，有时候网速问题加载会延时
        var time = 0;
        var login = setInterval(deleteLogin, 1000);

        function deleteLogin() {
            var loginWindow = document.getElementsByClassName('passport-login-container')[0];
            if (loginWindow != null) {
                loginWindow.remove();
                clearInterval(login);
            }
            if (time == 10) {
                clearInterval(login);
            }
            time++;
        }
 
    };
})();
