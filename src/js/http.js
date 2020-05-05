
//设置端口号
var basurl;
if (window.location.host.indexOf('shuohongkeji') > -1) {
    //线上环境
    basurl = ""
} else {
    //开发环境
    basurl = "/api"
};
//封装ajax请求
var http={
    post:function(options,callback){
        $.ajax({
            url: basurl+options.url,
            type:'post',
            data:JSON.stringify(options.data),
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            contentType:'application/json',
            dataType: 'json',
            success: function (res) {
                if(res.code===0){
                    callback(res.data)
                }else{
                    alert(res.msg)
                }
            },
            error: function (err) {
                err.msg
            },
        })
    },
    get:function(options,callback){
        $.ajax({
            url: basurl+options.url,
            type:'get',
            data:options.data,
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            contentType:'application/json',
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                callback(res)
                // if(res.code===0){
                //     callback(res.data)
                // }else{
                //     alert(res.msg)
                // }
            },
            error: function (err) {
                err.msg
            },
        })
    }
}
