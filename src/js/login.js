//用户登录
//获取用户输入的账号密码
$('#logon_btn').click(function(){
    var username=$('#username').val(),password=$('#password').val();
    //如果不存在提示信息
    if(!username || !password){
        alert('用户名和密码不能为空！')
    };
    //对密码记性加密并且截取前30位
    http.get(
    {
        url:'/login',
        data:{'userName':username,'pswd':$.md5(password).toLowerCase().substr(0,32)},
        method:'get'
    }
    ,function(data){
        // console.log(data)
        //将用户信息存储到localstrong中
        set('user',data.data);
        window.location.href='/index.html'
        // address: "河南郑州"
        // id: 2
        // headPortrait
        // nickName: "硕弘"
        // phoneNum: "16696203617"
        // points: 600
        // sekugou: "0dec4289eb24b359f140a87a1e4b2746"
    })
})