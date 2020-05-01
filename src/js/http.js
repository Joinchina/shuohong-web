import $ from './jquery-1.8.3.min'
//设置端口号
const api;
if (window.location.host.indexOf('shuohongkeji') > -1) {
    //线上环境
    api = "http://p.shuohongkeji.com"
} else {
    //开发环境
    api = "http://p.shuohongkeji.com"
};
//封装ajax请求
const post =(url,data)=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: api+url,
            type: 'post',
            data:data,
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            contentType:'application/json',
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            error: function (err) {
                reject(err)
            },
        })
    })
}
const get =(url,data)=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: baseUrl+url,
            type: 'get',
            data:data,
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            contentType:'application/json',
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            error: function (err) {
                reject(err)
            },
        })
    })
}
export {
    post,
    get
}