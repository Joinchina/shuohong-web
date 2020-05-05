var user;
var filetype=1,passageWaySize=1;
(function(){
    //进入主页需要先判断是否有用户信息，如果没有跳转登录页面登录
    user=get('user')
    if(!user){
        window.location.href='/login.html'
    };
    $("#name").text(user.nickName)
    console.log(user)
    //默认获取视频素材
    gitvideolist()
})();
//获取用户信息
function getUserInfo(){
    var str='';
    //获取用户信息
    http.get(
        {
            url:'/getPersonalInformation',
            data:{
                userId:user.id,
                sekugou:user.sekugou
            },
        },
        function(data){
            str='<img src="'+data.headPortrait+'" alt="">'+
            '<h1>Hi：<span>'+data.nickName+'</span></h1>'+
            '<h1>当前可用积分：<span>'+data.points+'</span></h1>'+
            '<h1>电话：<span>'+data.phoneNum+'</span></h1>'+
            '<h1>地址：<span>'+data.address+'</span></h1>'
            $('.modelcontent').html(str)
            $(".model").show();
        }
    )
}
//关闭模态框
function closeModel(){
    $(".model").hide();
}
//主题素材切换
function tab_btn(event){
    if(event.target.innerText==='主题光影素材'){
        filetype=1;
        $('.tab_left').addClass('choose_btn')
        $('.tab_right').removeClass('choose_btn')
        gitvideolist()
    }else{
        filetype=2;
        $('.tab_left').removeClass('choose_btn')
        $('.tab_right').addClass('choose_btn')
        gitplaylist()
    }
};
//通道选择
function channel_btn(event){
    passageWaySize=parseInt(event.target.innerText);
    $('.channel_box').children().removeClass('channel_choose')
    $('.channel_box').children().eq(Number(passageWaySize)-1).addClass('channel_choose');
    if(filetype===1){
        gitvideolist()
    }else{
        gitplaylist()
    }
};
//获取视频列表
function gitvideolist(){
    http.get(
        {
            url:'/getMoveByPassageWaySize',
            data:{
                'filetype':filetype,
                'passageWaySize':passageWaySize,
                'userId':user.id,
                'sekugou':user.sekugou
            }
        },
        function(data){
            // console.log(data)
            if(data.code===0){
                var data=data.data;
                // var data=[{"id":1,"filetype":1,"passageWaySize":2,"fileName":"海底世界","picAddress":"http://p.znkjcz.com/page1.png"},{"id":3,"filetype":1,"passageWaySize":2,"fileName":"refer","picAddress":"http://p.znkjcz.com/page1.png"},{"id":4,"filetype":1,"passageWaySize":2,"fileName":"未发文","picAddress":"http://p.znkjcz.com/page1.png"},{"id":5,"filetype":1,"passageWaySize":2,"fileName":"为人父骨肉同胞","picAddress":"http://p.znkjcz.com/page1.png"},{"id":6,"filetype":1,"passageWaySize":2,"fileName":"柔荑花特惠","picAddress":"http://p.znkjcz.com/page1.png"},{"id":7,"filetype":1,"passageWaySize":2,"fileName":"施工图如果让他","picAddress":"http://p.znkjcz.com/page1.png"}]
                var str='';
                for (var i = 0; i < data.length; i++) {
                    str+='<a href="/detail.html?fileId='+data[i].id+'&filetype='+data[i].filetype+'" target="_blank">'+
                            '<div class="video" >'+
                                '<div class="img_box">'+
                                    '<img src="'+data[i].picAddress+'" alt=""/>'+
                                '</div>'+
                                '<div class="text_box">'+
                                    '<p>'+data[i].fileName+'</p>'+
                                '</div>'+
                            '</div>'+
                        '</a>'                    
                };
                console.log(str)
                $('.material_box').html(str)        
            }else{
                alert(data.msg)
            }
        }
    )
};
//获取游戏列表
function gitplaylist(){
    http.get(
        {
            url:'/getUnityByPassageWaySize',
            data:{
                'filetype':filetype,
                'passageWaySize':passageWaySize,
                'userId':user.id,
                'sekugou':user.sekugou
            }
        },
        function(data){
            // console.log(data)
            if(data.code===0){
                var data=data.data;
                // var data=[{"id":1,"filetype":1,"passageWaySize":2,"fileName":"海底世界","picAddress":"http://p.znkjcz.com/page1.png"},{"id":3,"filetype":1,"passageWaySize":2,"fileName":"refer","picAddress":"http://p.znkjcz.com/page1.png"},{"id":4,"filetype":1,"passageWaySize":2,"fileName":"未发文","picAddress":"http://p.znkjcz.com/page1.png"},{"id":5,"filetype":1,"passageWaySize":2,"fileName":"为人父骨肉同胞","picAddress":"http://p.znkjcz.com/page1.png"},{"id":6,"filetype":1,"passageWaySize":2,"fileName":"柔荑花特惠","picAddress":"http://p.znkjcz.com/page1.png"},{"id":7,"filetype":1,"passageWaySize":2,"fileName":"施工图如果让他","picAddress":"http://p.znkjcz.com/page1.png"}]
                var str='';
                for (var i = 0; i < data.length; i++) {
                    str+='<a href="/detail.html?fileId='+data[i].id+'&filetype='+data[i].filetype+'" target="_blank">'+
                            '<div class="video" >'+
                                '<div class="img_box">'+
                                    '<img src="'+data[i].picAddress+'" alt=""/>'+
                                '</div>'+
                                '<div class="text_box">'+
                                    '<p>'+data[i].fileName+'</p>'+
                                '</div>'+
                            '</div>'+
                        '</a>'                    
                };
                console.log(str)
                $('.material_box').html(str)        
            }else{
                alert(data.msg)
            }
        }
    )
};

