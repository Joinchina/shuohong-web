"use strict";var basurl;basurl=-1<window.location.host.indexOf("shuohongkeji")?"":"/api";var http={get:function(t,a){$.ajax({url:basurl+t.url,type:"get",data:t.data,headers:{Accept:"application/json; charset=utf-8"},contentType:"application/json",dataType:"json",success:function(t){a(t)},error:function(t){console.log(t),alert(t.msg)}})}};