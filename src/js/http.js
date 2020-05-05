
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
                callback(res)
            },
            error: function (err) {
                console.log(err)
                alert(err.msg)
            },
        })
    }
}
