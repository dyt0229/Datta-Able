
//输出自己的日期格式
//把日期转换为字符串如 2018-11-3  2018/11/3 2018-11-3
//参数：d1,必须的参数
//分隔符 sep 可选，如果没有传入该参数，就以汉字分割，如果传入，就以改分割符连接
function toDateString(d1,sep){
    if(sep==undefined){
        return d1.getFullYear()+"年"+(d1.getMonth()+1)+"月"+d1.getDate()+"日";
    }
    return d1.getFullYear()+sep+(d1.getMonth()+1)+sep+d1.getDate();  
}
//输出自己的日期时间格式
//如：2018-11-4 14:15:12   2018/11/3 14:15:12   2018年11月3日 下午 2:45:12
//参数：d1,必须的参数
//分隔符 sep 可选，如果没有传入该参数，就以汉字分割，如果传入，就以该分割符连接
function toDateTimeString(d1,sep){
    var str = toDateString(d1,sep);
    if(sep==undefined){
        if(d1.getHours()<=12){
            str+="上午";
        }else{
            str+="下午";
        }
        str+=" "+d1.getHours()<=12?d1.getHours():d1.getHours()-12;
        str+=":"+d1.getMinutes()+":"+d1.getSeconds();
    }else{
        str+=" "+d1.getHours()+":"+d1.getMinutes()+":"+d1.getSeconds();
    }
    return str;
}
//两个不同日期的天数差
//返回值：差多少个24小时
function differentDate1(d1,d2){
    var diff=d1.getTime()-d2.getTime();
    return Math.floor(diff/(24*3600*1000));
}
//求两个日期的天数差 自然天数
//返回值：差多少个自然天
function differentDate2(d1,d2){
    d1.setHours(0);
    d1.setMinutes(0);
    d1.setSeconds(0);
    d2.setHours(0);
    d2.setMinutes(0);
    d2.setSeconds(0);
    var diff=d1.getTime()-d2.getTime();
    return Math.floor(diff/(24*3600*1000));
}



function toDateTimeString1(d1, sep) {
    // var str = toDateString(d1, sep);
    var str="";
    if (sep == undefined) {
        if (d1.getHours() <= 12) {
            str += "上午";
        } else {
            str += "下午";
        }
        str += " " + d1.getHours() <= 12 ? d1.getHours() : d1.getHours() - 12;
        str += ":" + d1.getMinutes() <= 9 ? "0" + d1.getMinutes() : d1.getMinutes();
        str += ":" + d1.getSeconds() <= 9 ? "0" + d1.getSeconds() : d1.getSeconds();
    } else {
        str += " " + d1.getHours() <= 9 ? "0" + d1.getHours() : +d1.getHours();
        str +=":";
        str +=  d1.getMinutes() <= 9 ? "0" + d1.getMinutes() : d1.getMinutes(); 
        str +=":";
        str +=  d1.getSeconds() <= 9 ? "0" + d1.getSeconds() : d1.getSeconds();
    }
    return str;
}
