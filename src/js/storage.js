//简单封装下localstong
var Storage=window.localStorage
//存储信息
function set(name,data){
    Storage.setItem(name,JSON.stringify(data));
}
//获取
function get(name){
    return JSON.parse(Storage.getItem(name));
}
//删除
function remove(name){
    Storage.removeItem(name)
}