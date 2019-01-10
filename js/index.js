$(function(){
    console.log("1");
    //导航栏列表点击展开收回
    $(".nav-list-li").each(function(){
        let isClick=true;
        $(this).click(function(){
            $(this).next("ul").slideToggle("slow");
            
            $(this).siblings().next("ul").slideUp();
            $(this).parent().siblings(".nav-lists").find(".nav-list-li").next("ul").slideUp();
            
            if(isClick){
                // $(this).siblings().css({
                //     "background": "",
                //     "border-left": "3px solid #1e1f21"
                // });
                // $(this).parent().siblings(".nav-lists").find(".nav-list-li").css({
                //     "border-left": "3px solid #1e1f21"
                // });
                // $(this).parent().parent().find(".nav-list-li").css({
                //     "background":"",
                //     "border-left": "3px solid #1e1f21"
                // });
                // $(this).css({
                //     "background": "#2e3033",
                //     "border-left":"3px solid #1dc4e9"
                // });
                $(this).children("a").css({
                    "transform":"rotate(90deg)"
                });
                $(this).siblings(".nav-list-li").children("a").css({
                    "transform":"rotate(0deg)"
                });
                $(this).parent().siblings(".nav-lists").find("a").css({
                    "transform": "rotate(0deg)"
                });
                isClick=false;
            }else{
                $(this).children("a").css({
                    "transform": "rotate(0deg)"
                });
                isClick=true;
            }
        });
    });


    //导航栏点击是否展开或隐藏------------------------------------------
    var navisClick=true;
    $("#moreNav").click(function(){
        if (navisClick){
            $("#moreNav").css({ 
            "background":"url(imgs/index/navCuo.png) no-repeat center"
            })
            $(".mainLeft").css({
                "width": "100px"
            });
            $(".nav").addClass("isClick");
            navisClick=false;
        }else{
            $("#moreNav").css({
                "background": "url(imgs/index/nav-more.png) no-repeat center"
            })
            $(".mainLeft").css({
                "width":"264px"
            });
            $(".nav").removeClass("isClick");
            navisClick = true;
        }
    });

    //导航栏处于点击状态时，有isClick的className触发进入移出事件
    let navisHidden = false;
    //导航栏移入事件
    $(".nav").mouseenter(function () {
        if ($(this).hasClass("isClick")) {
            if (navisHidden) {
                $("#moreNav").css({
                    "display": "block",
                    "opacity":1
                })
                $(".nav").animate({
                    "width": "264px"
                }, "slow");
                setTimeout(() => {
                $(".logo h2").css({
                    "display": "block"
                });
                $(".nav-list-li").find("h2").css({
                    "text-indent": "0"
                })
                $(".nav-list-ul").children("li").css({
                    "text-indent": "25px"
                })
                }, 50);
                navisHidden = !navisHidden;
            }
        }
    });
    //导航栏移出事件
    $(".nav").mouseleave(function () {
        if ($(this).hasClass("isClick")) {
            if (!navisHidden) {
                $("#moreNav").css({
                    "display": "none"
                })
                $(".nav").animate({
                    "width": "100px"
                }, "slow")
                setTimeout(() => {
                $(".logo h2").css({
                    "display": "none"
                });
                $(".nav-list-li").find("h2").css({
                    "text-indent": "-200px"
                })
                $(".nav-list-ul").children("li").css({
                    "text-indent": "-200px"
                })
                }, 50);
                navisHidden = !navisHidden;
            }
        }
    });
    
    // 头部下拉菜单点击展开或收回
    let sIsClick=true;
    $(".selectBox").click(function(){
        if (sIsClick){
            $(".selectBoxDetail").css({
                "display": "block"
            })
            sIsClick = !sIsClick;
        }else{
            $(".selectBoxDetail").css({
                "display": "none"
            })
            sIsClick = !sIsClick;
        }
    });

    // 搜索btn点击展开头部搜索框
    $(".seek").click(function(){
            $(".seek").css({
                "display":"none"
            });
            $(".inputSeek").animate({
                "opacity":1,
                "width": "165px"
            },"slow")
    });
    //搜索input框点击收回
    $(".closeSeek").click(function(){
        
        $(".inputSeek").animate({
            "width": "0",
            "opacity":0
        },"slow",function(){
            $(".seek").css({
            "display": "block"
        });
        })
    });

    //点击个人聊天窗口li，聊天界面窗口展开
    $(".chatMain").children("li").each(function(){
        $(this).click(function(){
            $(".chatFrameTit").children("span").text($(this).find("h2").text())
            $(".neirongLeft").children("span").text($(this).find("h2").text())
            $(".chatFrame").animate({
                "right": "0"
            }, "slow")
        });
    });
    //聊天窗口点击收回
    $(".closeChat").click(function(){
        $(".chatFrame").animate({
            "right":"-100%"
        },"slow")
    });
    //动态创建聊天发送内容
    function showChatLi(){
        let htmlStr = `<li class="chatRight">
                                    <div class="neirongRight">
                                        `+ $(".chatContent").val() + `
                                        <img src="imgs/index/rightmsg.png" class="rightmsg" />
                                    </div>
                                    <span class="rightTime">now</span>
                                </li>`
        $(".chatMainCon").append(htmlStr);
        let leftHtml = `<li class="chatLeft">
                                <img src="imgs/index/touxiang1.png" class="touxiangLeft" />
                                <div class="neirongLeft">
                                    你刚刚说了"`+ $(".chatContent").val() + `" 我不听，我不听！
                                    <img src="imgs/index/leftmsg.png" class="leftmsg" />
                                </div>
                                <span class="leftTime">now</span>
                            </li>`
        $(".chatMainCon").append(leftHtml);
        $(".chatContent").val("");
    }
    //点击发送按钮将聊天输入框的内容发送出去
    $(".send").click(function(){
        if ($(".chatContent").val()!=""){
            showChatLi()       
        }else{
            alert("发送内容不能为空！")
        }
    });
    //点击enter键将内容发送出去
    $(".chatContent").keyup(function(e){
        var evt=event||window.event;
        if(e.keyCode==13){
            showChatLi()
        }
    });
    //点击来信，展开整个聊天盒子
    $(".headMag").click(function(){
        $('.chatBox').animate({
            "right":0
        },"slow");
    });
    //点击聊天关闭控件，将整个聊天盒子收回去
    $(".ChatControls").click(function(){
        $('.chatBox').animate({
            "right": "-386px"
        }, "slow");
    });
    //点击头部rightConfig按钮，出现相对应的盒子
    // let headBtnisClick=true;
    // $(".rightConfig").children("a").click(function(){
    //     if (headBtnisClick){
    //         $(".rightConfig").children("a").next().css({
    //             "display": "none"
    //         });
    //         $(this).next().css({
    //             "display":"block"
    //         });
    //         headBtnisClick = !headBtnisClick;
    //     }else{
    //         $(this).next().css({
    //             "display": "none"
    //         });
    //         headBtnisClick = !headBtnisClick;
    //     }
    // });
    let tzIsclick=true;
    $(".tz").click(function(){
        if (tzIsclick){
            if (setIsclick==false){
                $(".setting").css({
                "display":"none"
            })
                setIsclick = !setIsclick;
            }
            
            $(".newsInfo").css({
                "display":"block"
            })
            tzIsclick = !tzIsclick;
        }else{
            $(".newsInfo").css({
                "display": "none"
            })
            tzIsclick = !tzIsclick;
        }
    });
    let setIsclick=true;
    $(".set").click(function(){
        if (setIsclick){
            if (tzIsclick==false){
               $(".newsInfo").css({
                "display": "none"
            }) 
            tzIsclick = !tzIsclick;
            }
            
            $(".setting").css({
                "display": "block"
            })
            setIsclick = !setIsclick;
        }else{
            $(".setting").css({
                "display": "none"
            })
            setIsclick = !setIsclick;
        }
    });

    $(".mapbig").click(function(){
        let width1=$(".mapbg img").outerWidth()+50;
        let height1=$(".mapbg img").outerHeight()+28;
        $(".mapbg img").animate({
            "width": width1+"px",
            "height": height1+"px",
            "left": 85-(width1-587)/2+"px",
            "top": 85-(height1-330)/2+"px"
        },"slow");
    });
    $(".mapsmall").click(function(){
        let width1 = $(".mapbg img").outerWidth() - 50;
        let height1 = $(".mapbg img").outerHeight() - 28;
        $(".mapbg img").animate({
            "width": width1 + "px",
            "height": height1 + "px",
            "left":  85-(width1 - 587) / 2+ "px",
            "top": 85-(height1 - 330) / 2+ "px"
        }, "slow");
    });
    $(".maphome").click(function(){
        $(".mapbg img").css({
            "width":"587px",
            "height":"330px",
            "left":"85px",
            "top":"85px"
        });
    });


    //点击导航栏跳转页面
    $(".tiaoindex").click(function(){
        location.href="index.html"
    });
    $(".tiao1").click(function () {
        location.href = "chart.html"
    });
    $(".tiao2").click(function () {
        location.href = "google-chart.html"
    });
    $(".tiao3").click(function () {
        location.href = "alert.html"
    });
    $(".tiao4").click(function () {
        location.href = "progress.html"
    });
    $(".tiao5").click(function () {
        location.href = "error404.html"
    });
    $(".tiao6").click(function () {
        location.href = "button.html"
    });


});







// $(".nav").mouseenter(function () {
    //         if (navisHidden) {
    //             $("#moreNav").css({
    //                 "display": "block"
    //             })
    //             $(this).removeClass("isClick");
    //             navisHidden = !navisHidden;
    //         }
    // });

    // $(".nav").mouseleave(function () {
    //         if (!navisHidden) {
    //             $("#moreNav").css({
    //                 "display": "none"
    //             })
    //             $(this).addClass("isClick");
    //             navisHidden = !navisHidden;
    //         }
    // });