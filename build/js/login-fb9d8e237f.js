"use strict";$("#logon_btn").click(function(){var t=$("#username").val(),e=$("#password").val();t&&e||alert("用户名和密码不能为空！"),http.get({url:"/login",data:{userName:t,pswd:$.md5(e).toLowerCase().substr(0,32)},method:"get"},function(t){set("user",t.data),window.location.href="/index.html"})});