var url={};
var user='';
var deduction=0;
(function(){
    user=get('user')
    if(!user){
        window.location.href='/login.html'
    };
    user=user;
    console.log(user)
    //获取url参数
    console.log(window.location.search)
    var urldata=window.location.search.substr(1,window.location.search.length-1);
    var arr=[];
    var obj={};
    var arr1=[];
    arr=urldata.split('&');
    for (var i = 0; i < arr.length; i++) {
        arr1=arr[i].split('=')  
        obj[arr1[0]]=Number(arr1[1])      
    }
    console.log(obj)
    url=obj;
    getDetail(user,obj.fileId,obj.filetype)
})()
// 获取详情
function getDetail(user,fileId,filetype){
    http.get(
        {
            url:'/getResourceDetail',
            data:{
                'fileId':fileId,
                'filetype':filetype,
                'userId':user.id,
                'sekugou':user.sekugou
            }
        },
        function(data){
            console.log(data)
            var data=data.data
            // var data={"id":1,"filetype":1,"passageWaySize":2,"fileName":"海底世界","picAddress":"http:xxx.jpg","fileAddress":"http:xxx.mp4","resourceAddress":"http:xxx.mp4","type":"MP4","resolvingPower":"1280*768","picS":['httpxxx.jpg','httpxxx.jpg'],"deduction":60};
            deduction=data.deduction;
            var str='<div class="header">'+
                        '<h1>'+data.fileName+'</h1>'+
                    '</div>'+
                    '<div class="video_box">'+
                        '<video src="'+data.moveAddress+'" controls="controls"></video>'+
                    '</div>'+
                    '<div class="describe">'+
                        '<div class="left">'+
                            '<h1>文字描述：<span>'+data.describe+'</span></h1>'+
                            '<h1>格式：<span>'+data.type+'</span> 分辨率：<span>'+data.resolvingPower+'</span></h1>'+
                        '</div>'+
                        '<div class="right">'+
                            '<button>点击下载</button>'+
                            '<h1>下载需要'+data.deduction+'积分</h1>'+
                        '</div>'+
                    '</div>'
            $('.detail_box').html(str);
            var str2='';
            for (var i = 0; i < data.picS.length; i++) {
                str2+='<div class="img_box">'+
                        '<img src="'+data.picS[i]+'" alt=""/>'+
                    '</div>'                
            }        
            $('.detail_box').append(str2);        
            
        }
    )
}
//点击下载视频
function downVideo(){
    //判断用户积分是否达标
    if(user.points<deduction){
        //积分不够
        alert('您当前积分不够，下载视频需要'+deduction+'分，您只有'+user.points+'')
    }else{
        http.get(
            {
                url:'/',
                data:{
                    'fileId':url.fileId,
                    'filetype':url.filetype,
                    'userId':user.id,
                    'sekugou':user.sekugou
                }
            },
            function(data){
                if(data.code===0){
                    window.open(data.data,'_blank')
                }else{
                    alert(data.msg)
                }
                console.log(data)
            }
        )
    }
}
function down(){
    //通常我们是使用一个form流去做下载
    // var form=$("<form>");//定义一个form表单
    // form.attr("style","display:none");
    // form.attr("target","");
    // form.attr("method","get");  //请求类型
    // form.attr("action",url);   //请求地址
    // $("body").append(form);//将表单放置在web中
    // var input1=$("<input>");
    // input1.attr("type","hidden");
    // input1.attr("name","fileId");
    // input1.attr("value",url.fileId);
    // form.append(input1);

    // var input2=$("<input>");
    // input2.attr("type","hidden");
    // input2.attr("name","filetype");
    // input2.attr("value",url.filetype);
    // form.append(input2);

    // var input3=$("<input>");
    // input2.attr("type","hidden");
    // input2.attr("name","userId");
    // input2.attr("value",user.id);
    // form.append(input3);

    // var input4=$("<input>");
    // input2.attr("type","hidden");
    // input2.attr("name","sekugou");
    // input2.attr("value",user.sekugou);
    // form.append(input4);

    // form.submit();//表单提交

}