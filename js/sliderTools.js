function Slider(boxDom, width, height, imgs, btnColor, btnHighColor, btnSize, isCircle, timeSpace) {
    this.boxDom = boxDom;
    this.width = width;
    this.height = height;
    this.imgs = imgs; //要播放的图片数组

    this.btnColor = btnColor;
    this.btnHighColor = btnHighColor;
    this.btnSize = btnSize;
    this.isCircle = isCircle;

    this.timeSpace = timeSpace;
    this.currIndex = 0;
    this.myTimer = null;

    this.createUI = function () {
        this.boxDom.width = this.width + "px";
        this.boxDom.height = this.height + "px";
        this.boxDom.style.overflow = "hidden";
        this.boxDom.style.position = "relative";
        for (let i = 0; i < imgs.length; i++) {
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = "position:absolute;top:0;";
            if (i == 0) {
                imgDom.style.left = "0";
            } else {
                imgDom.style.left = this.width + "px";
            }
            imgDom.style.width = this.width + "px";
            imgDom.style.height = this.height + "px";
            this.boxDom.appendChild(imgDom);
        }
        let ulDom = document.createElement("ul");
        ulDom.style.cssText = "position:absolute;list-style:none;right:50px;bottom:10px;z-Index:2;";
        this.boxDom.appendChild(ulDom);

        for (let i = 0; i < imgs.length; i++) {
            let liDom = document.createElement("li");
            liDom.style.cssText = "margin-right:20px;float:left";
            liDom.style.width = this.btnSize + "px";
            liDom.style.height = this.btnSize + "px";
            if (this.isCircle) {
                liDom.style.borderRadius = "50%";
            }
            if (i == 0) {
                liDom.style.backgroundColor = this.btnHighColor;
            } else {
                liDom.style.backgroundColor = this.btnColor;
            }
            ulDom.appendChild(liDom);
        }
    }
    //添加事件
    this.addEvent = function () {
        let that = this;
        this.onmouseover = function () {
            that.stop();
        };
        this.onmouseout = function () {
            that.autoPlay();
        };
        let lis = this.boxDom.lastElementChild.children;
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                that.goImg(i)
            };
        }
    }
    //自动播放
    this.autoPlay = function () {
        if (this.myTimer != null) {
            return;
        }
        this.myTimer = setInterval(() => {
            //改变数据
            let outIndex = this.currIndex;
            this.currIndex++;
            //边界处理
            if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
                this.currIndex = 0;
            }
            //改变外观
            this.showImg(outIndex, this.currIndex);
        }, this.timeSpace);
    }
    //移上停止
    this.stop = function () {
        if (this.myTimer != null) {
            window.clearInterval(this.myTimer);
            this.myTimer = null;
        }
    }
    //跳转指定的图片
    this.goImg = function (transIndex) {
        //处理数据
        let outIndex = this.currIndex;
        this.currIndex = transIndex;
        //处理边界
        if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
            this.currIndex = 0;
        }
        //改变外观
        this.showImg(outIndex, this.currIndex);
    }
    //改变外观
    this.showImg = function (outIndex, inIndex) {
        //图片
        let imgs = this.boxDom.children;
        imgs[inIndex].style.left = this.width + "px";
        //让inIndex滑入
        linearMove3(imgs[inIndex], "left", this.width, 0, this.timeSpace * 1 / 10);
        //让outIndex滑出
        linearMove3(imgs[outIndex], "left", 0, -1 * this.width, this.timeSpace * 1 / 10);

        //改豆豆
        let lis = this.boxDom.lastElementChild.children;
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.backgroundColor = this.btnColor;
        }
        lis[this.currIndex].style.backgroundColor = this.btnHighColor;
    }
    this.createUI();
    this.addEvent();
}

//滑入滑出
function Slider01(obj) {
    let defaultObj={
        boxDom:null,
        width:400,
        height:300,
        imgs:[],
        btnColor:'gray',
        btnHighColor:'orange',
        btnSize:20,
        isCircle:true,
        currIndex:0,
        timeSpace:16,
        myTimer:null,
        isAutoPlay:true
    };
    for(let key in defaultObj){
        obj[key]!==undefined?(this[key]=obj[key]):(this[key]=defaultObj[key]);
    }
    this.createUI();
    this.addEvent();
    if(this.autoPlay){
        this.autoPlay();
    }
}

Slider01.prototype.createUI = function () {
        this.boxDom.width = this.width + "px";
        this.boxDom.height = this.height + "px";
        this.boxDom.style.overflow = "hidden";
        this.boxDom.style.position = "relative";
        for (let i = 0; i < this.imgs.length; i++) {
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = "position:absolute;top:0;";
            if (i == 0) {
                imgDom.style.left = "0";
            } else {
                imgDom.style.left = this.width + "px";
            }
            imgDom.style.width = this.width + "px";
            imgDom.style.height = this.height + "px";
            this.boxDom.appendChild(imgDom);
        }
        let ulDom = document.createElement("ul");
        ulDom.style.cssText = "position:absolute;list-style:none;right:50px;bottom:10px;z-Index:2;";
        this.boxDom.appendChild(ulDom);

        for (let i = 0; i < imgs.length; i++) {
            let liDom = document.createElement("li");
            liDom.style.cssText = "margin-right:20px;float:left";
            liDom.style.width = this.btnSize + "px";
            liDom.style.height = this.btnSize + "px";
            if (this.isCircle) {
                liDom.style.borderRadius = "50%";
            }
            if (i == 0) {
                liDom.style.backgroundColor = this.btnHighColor;
            } else {
                liDom.style.backgroundColor = this.btnColor;
            }
            ulDom.appendChild(liDom);
        }
    }
    //添加事件
Slider01.prototype.addEvent = function () {
        let that = this;
        this.onmouseover = function () {
            that.stop();
        };
        this.onmouseout = function () {
            if(that.isAutoPlay){
                that.autoPlay();
            }
        };
        let lis = this.boxDom.lastElementChild.children;
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                that.goImg(i)
            };
        }
    }
    //自动播放
Slider01.prototype.autoPlay = function () {
        if (this.myTimer != null) {
            return;
        }
        this.myTimer = setInterval(() => {
            //改变数据
            let outIndex = this.currIndex;
            this.currIndex++;
            //边界处理
            if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
                this.currIndex = 0;
            }
            //改变外观
            this.showImg(outIndex, this.currIndex);
        }, this.timeSpace);
    }
    //移上停止
Slider01.prototype.stop = function () {
        if (this.myTimer != null) {
            window.clearInterval(this.myTimer);
            this.myTimer = null;
        }
    }
    //跳转指定的图片
Slider01.prototype.goImg = function (transIndex) {
        //处理数据
        let outIndex = this.currIndex;
        this.currIndex = transIndex;
        //处理边界
        if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
            this.currIndex = 0;
        }
        //改变外观
        this.showImg(outIndex, this.currIndex);
    }
    //改变外观
Slider01.prototype.showImg = function (outIndex, inIndex) {
        //图片
        let imgs = this.boxDom.children;
        imgs[inIndex].style.left = this.width + "px";
        //让inIndex滑入
        linearMove3(imgs[inIndex], "left", this.width, 0, this.timeSpace * 1 / 10);
        //让outIndex滑出
        linearMove3(imgs[outIndex], "left", 0, -1 * this.width, this.timeSpace * 1 / 10);

        //改豆豆
        let lis = this.boxDom.lastElementChild.children;
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.backgroundColor = this.btnColor;
        }
        lis[this.currIndex].style.backgroundColor = this.btnHighColor;
    }
   



//淡入淡出轮播图
function Slider02(obj) {
    let defaultObj = {
        boxDom: null,
        width: 400,
        height: 300,
        imgs: [],
        btnColor: 'gray',
        btnHighColor: 'orange',
        btnSize: 20,
        isCircle: true,
        currIndex: 0,
        timeSpace: 1000,
        myTimer: null,
        isAutoPlay: true
    };
    for (let key in defaultObj) {
        obj[key] !== undefined ? (this[key] = obj[key]) : (this[key] = defaultObj[key]);
    }
    this.createUI();
    this.addEvent();
    if (this.autoPlay) {
        this.autoPlay();
    }
}

Slider02.prototype.createUI = function () {
    this.boxDom.width = this.width + "px";
    this.boxDom.height = this.height + "px";
    // this.boxDom.style.overflow = "hidden";
    // this.boxDom.style.position = "relative";
    for (let i = 0; i < this.imgs.length; i++) {
        let imgDom = document.createElement("img");
        imgDom.src = this.imgs[i];
        imgDom.style.cssText = "position:absolute;top:0;left:0;";
        if (i == 0) {
            imgDom.style.opacity = "1";
        } else {
            imgDom.style.opacity = "0";
        }
        imgDom.style.width = this.width + "px";
        imgDom.style.height = this.height + "px";
        this.boxDom.appendChild(imgDom);
    }
    let ulDom = document.createElement("ul");
    ulDom.style.cssText = "position:absolute;list-style:none;right:50px;bottom:10px;z-Index:2;";
    this.boxDom.appendChild(ulDom);

    for (let i = 0; i < this.imgs.length; i++) {
        let liDom = document.createElement("li");
        liDom.style.cssText = "margin-right:20px;float:left";
        liDom.style.width = this.btnSize + "px";
        liDom.style.height = this.btnSize + "px";
        if (this.isCircle) {
            liDom.style.borderRadius = "50%";
        }
        if (i == 0) {
            liDom.style.backgroundColor = this.btnHighColor;
        } else {
            liDom.style.backgroundColor = this.btnColor;
        }
        ulDom.appendChild(liDom);
    }
}
//添加事件
Slider02.prototype.addEvent = function () {
    let that = this;
    this.onmouseover = function () {
        that.stop();
    };
    this.onmouseout = function () {
        if (that.isAutoPlay) {
            that.autoPlay();
        }
    };
    let lis = this.boxDom.lastElementChild.children;
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            that.goImg(i)
        };
    }
}
//自动播放
Slider02.prototype.autoPlay = function () {
    if (this.myTimer != null) {
        return;
    }
    this.myTimer = setInterval(() => {
        //改变数据
        let outIndex = this.currIndex;
        this.currIndex++;
        //边界处理
        if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
            this.currIndex = 0;
        }
        //改变外观
        this.showImg(outIndex, this.currIndex);
    }, this.timeSpace);
}
//移上停止
Slider02.prototype.stop = function () {
    if (this.myTimer != null) {
        window.clearInterval(this.myTimer);
        this.myTimer = null;
    }
}
//跳转指定的图片
Slider02.prototype.goImg = function (transIndex) {
    //处理数据
    let outIndex = this.currIndex;
    this.currIndex = transIndex;
    //处理边界
    if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
        this.currIndex = 0;
    }
    //改变外观
    this.showImg(outIndex, this.currIndex);
}
//改变外观
Slider02.prototype.showImg = function (outIndex, inIndex) {
    //图片
    let imgs = this.boxDom.children;
    // imgs[inIndex].style.left ="0";
    //让inIndex滑入
    // linearMove3(imgs[inIndex], "left", this.width, 0, this.timeSpace * 1 / 10);
    fadeInOut(imgs[outIndex], imgs[inIndex], this.timeSpace * 1 / 10);
    //让outIndex滑出
    // linearMove3(imgs[outIndex], "left", 0, -1 * this.width, this.timeSpace * 1 / 10);

    //改豆豆
    let lis = this.boxDom.lastElementChild.children;
    for (let i = 0; i < lis.length; i++) {
        lis[i].style.backgroundColor = this.btnColor;
    }
    lis[this.currIndex].style.backgroundColor = this.btnHighColor;
}



//淡入淡出轮播图（jQuery）
function Slider03(obj) {
    let defaultObj = {
        $box: null,
        width: 400,
        height: 300,
        imgs: [],
        btnColor: 'gray',
        btnHighColor: 'orange',
        btnSize: 20,
        isCircle: true,
        currIndex: 0,
        timeSpace: 1000,
        myTimer: null,
        isAutoPlay: true
    };
    for (let key in defaultObj) {
        obj[key] !== undefined ? (this[key] = obj[key]) : (this[key] = defaultObj[key]);
    }
    this.createUI();
    this.addEvent();
    if (this.autoPlay) {
        this.autoPlay();
    }
}

Slider03.prototype.createUI = function () {
    // this.boxDom.width = this.width + "px";
    // this.boxDom.height = this.height + "px";
    this.$box.css({
        "width":this.width+'px',
        "height":this.height+'px',
        "overflow":"hidden",
        "position":"relative"
    });
    // this.boxDom.style.position = "relative";
    let htmlStr='';
    //img
    for (let i = 0; i < this.imgs.length; i++) {
        htmlStr+='<img src="'+this.imgs[i]+'" style="position:absolute;top:0;left:0;';
        htmlStr+='width:'+this.width+'px;';
        htmlStr+='height'+this.height+'px;';
        htmlStr+='opacity:';
        if (i == 0) {
            htmlStr+=1;
        } else {
            htmlStr+=0;
        }
        htmlStr+=';"/>'
        
    }
    this.$box.append(htmlStr);
    //ul li 
    htmlStr ='<ul style="position:absolute;list-style:none;border-radius:12px;right:125px;bottom:10px;">';
    for (let i = 0; i < this.imgs.length; i++) {
        htmlStr+='<li style="margin-right:20px;float:left;';
        htmlStr+='width:'+this.btnSize+'px;';
        htmlStr+='height:'+this.btnSize+'px;';
        if (this.isCircle) {
            htmlStr+='border-radius:50%;';
        }
        htmlStr+='background-color:';
        if (i == 0) {
            htmlStr+= this.btnHighColor;
        } else {
            htmlStr+= this.btnColor;
        }
        htmlStr+=';"></li>';
    }
    htmlStr+='</ul>';
    this.$box.append(htmlStr);
}
//添加事件
Slider03.prototype.addEvent = function () {
    let that = this;
    // this.$box.mouseover(function () {
    //     that.stop();
    // });
    // this.$box.mouseout(function () {
    //     if (that.isAutoPlay) {
    //         that.autoPlay();
    //     }
    // });
    let $lis = $(this.$box.selector+" ul").children();
    $lis.click(function(){
        that.goImg($(this).index());
    });
}
//自动播放
Slider03.prototype.autoPlay = function () {
    if (this.myTimer != null) {
        return;
    }
    this.myTimer = setInterval(() => {
        //改变数据
        let outIndex = this.currIndex;
        this.currIndex++;
        //边界处理
        if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
            this.currIndex = 0;
        }
        //改变外观
        this.showImg(outIndex, this.currIndex);
    }, this.timeSpace);
}
//移上停止
Slider03.prototype.stop = function () {
    if (this.myTimer != null) {
        window.clearInterval(this.myTimer);
        this.myTimer = null;
    }
}
//跳转指定的图片
Slider03.prototype.goImg = function (transIndex) {
    //处理数据
    let outIndex = this.currIndex;
    this.currIndex = transIndex;
    //处理边界
    if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
        this.currIndex = 0;
    }
    //改变外观
    this.showImg(outIndex, this.currIndex);
}
//改变外观
Slider03.prototype.showImg = function (outIndex, inIndex) {
    //图片
    let $imgs = this.$box.children("img");
    $imgs.eq(inIndex).animate({
        "opacity":1
    },300);
    $imgs.eq(outIndex).animate({
        "opacity":0
    },300);
    // imgs[inIndex].style.left ="0";
    //让inIndex滑入
    // linearMove3(imgs[inIndex], "left", this.width, 0, this.timeSpace * 1 / 10);
    // fadeInOut(imgs[outIndex], imgs[inIndex], this.timeSpace * 1 / 10);
    //让outIndex滑出
    // linearMove3(imgs[outIndex], "left", 0, -1 * this.width, this.timeSpace * 1 / 10);

    //改豆豆
    let $lis = $(this.$box.selector+" li");
    $lis.eq(this.currIndex)
    .css({"background-color":this.btnHighColor})
    .siblings()
    .css({"background-color":this.btnColor});
}


//滑入滑出轮播图（jQuery）
function Slider04(obj) {
    let defaultObj = {
        $box: null,
        width: 400,
        height: 300,
        imgs: [],
        btnColor: 'gray',
        btnHighColor: 'orange',
        btnWidthSize: 20,
        btnHeightSize: 20,
        isCircle: true,
        currIndex: 0,
        timeSpace: 1000,
        myTimer: null,
        isAutoPlay: true
    };
    for (let key in defaultObj) {
        obj[key] !== undefined ? (this[key] = obj[key]) : (this[key] = defaultObj[key]);
    }
    this.createUI();
    this.addEvent();
    if (this.autoPlay) {
        this.autoPlay();
    }
}

Slider04.prototype.createUI = function () {
    // this.boxDom.width = this.width + "px";
    // this.boxDom.height = this.height + "px";
    this.$box.css({
        "width": this.width + 'px',
        "height": this.height + 'px',
        "overflow": "hidden",
        "position": "relative"
    });
    // this.boxDom.style.position = "relative";
    let htmlStr = '';
    //img
    for (let i = 0; i < this.imgs.length; i++) {
        htmlStr += '<img src="' + this.imgs[i] + '" style="position:absolute;top:0;left:0;';
        htmlStr += 'width:' + this.width + 'px;';
        htmlStr += 'height' + this.height + 'px;';
        htmlStr += 'left:';
        if (i == 0) {
            htmlStr += '0px';
        } else {
            htmlStr += this.width+'px';
        }
        htmlStr += ';"/>'

    }
    this.$box.append(htmlStr);
    //ul li 
    htmlStr = '<ul style="position:absolute;list-style:none;right:65px;bottom:25px;">';
    for (let i = 0; i < this.imgs.length; i++) {
        htmlStr += '<li style="margin-right:20px;float:left;';
        htmlStr += 'width:' + this.btnWidthSize + 'px;';
        htmlStr += 'height:' + this.btnHeightSize + 'px;';
        if (this.isCircle) {
            htmlStr += 'border-radius:50%;';
        }
        htmlStr += 'background-color:';
        if (i == 0) {
            htmlStr += this.btnHighColor;
        } else {
            htmlStr += this.btnColor;
        }
        htmlStr += ';"></li>';
    }
    htmlStr += '</ul>';
    this.$box.append(htmlStr);
}
//添加事件
Slider04.prototype.addEvent = function () {
    let that = this;
    // this.$box.mouseover(function () {
    //     that.stop();
    // });
    // this.$box.mouseout(function () {
    //     if (that.isAutoPlay) {
    //         that.autoPlay();
    //     }
    // });
    let $lis = $(this.$box.selector + " ul").children();
    $lis.click(function () {
        that.goImg($(this).index());
    });
}
//自动播放
Slider04.prototype.autoPlay = function () {
    if (this.myTimer != null) {
        return;
    }
    this.myTimer = setInterval(() => {
        //改变数据
        let outIndex = this.currIndex;
        this.currIndex++;
        //边界处理
        if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
            this.currIndex = 0;
        }
        //改变外观
        this.showImg(outIndex, this.currIndex);
    }, this.timeSpace);
}
//移上停止
Slider04.prototype.stop = function () {
    if (this.myTimer != null) {
        window.clearInterval(this.myTimer);
        this.myTimer = null;
    }
}
//跳转指定的图片
Slider04.prototype.goImg = function (transIndex) {
    //处理数据
    let outIndex = this.currIndex;
    this.currIndex = transIndex;
    //处理边界
    if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
        this.currIndex = 0;
    }
    //改变外观
    this.showImg(outIndex, this.currIndex);
}
//改变外观
Slider04.prototype.showImg = function (outIndex, inIndex) {
    //图片
    let $imgs = this.$box.children("img");
    $imgs.eq(inIndex).css({
        "left":this.width+"px"
    });
    $imgs.eq(inIndex).animate({
        "left": 0
    }, 300);
    $imgs.eq(outIndex).animate({
        "left": -1*this.width+"px"
    }, 300);
    
    // imgs[inIndex].style.left ="0";
    //让inIndex滑入
    // linearMove3(imgs[inIndex], "left", this.width, 0, this.timeSpace * 1 / 10);
    // fadeInOut(imgs[outIndex], imgs[inIndex], this.timeSpace * 1 / 10);
    //让outIndex滑出
    // linearMove3(imgs[outIndex], "left", 0, -1 * this.width, this.timeSpace * 1 / 10);

    //改豆豆
    let $lis = $(this.$box.selector + " li");
    $lis.eq(this.currIndex)
        .css({ "background-color": this.btnHighColor })
        .siblings()
        .css({ "background-color": this.btnColor });
}