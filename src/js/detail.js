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
                'id':fileId,
                'filetype':filetype,
                'userId':user.id,
                'sekugou':user.sekugou
            }
        },
        function(data){
            console.log(data)
            var data=data.data
            // var data={"id":1,"filetype":1,"passageWaySize":2,"fileName":"海底世界","picAddress":"http:xxx.jpg","fileAddress":"http:xxx.mp4","resourceAddress":"http:xxx.mp4","type":"MP4","resolvingPower":"1280*768","picS":['httpxxx.jpg','httpxxx.jpg'],"deduction":60};data.describe
            deduction=data.deduction;
            var str='<div class="header">'+
                        '<h1>'+data.fileName+'</h1>'+
                    '</div>'+
                    '<div class="video_box">'+
                        '<video src="'+data.resourceAddress+'" controls="controls"></video>'+
                    '</div>'+
                    '<div class="describe">'+
                        '<div class="left">'+
                            '<h1>文字描述：<span>'+data.describe+'</span></h1>'+
                            '<h1>格式：<span>'+data.type+'</span> 分辨率：<span>'+data.resolvingPower+'</span></h1>'+
                        '</div>'+
                        '<div class="right">'+
                            '<button onclick="downVideo()">点击下载</button>'+
                            '<h1>下载需要'+data.deduction+'积分</h1>'+
                        '</div>'+
                    '</div>'
            $('.detail_box').html(str);
            var str2='';
            var imgarr=[];
            imgarr=data.picS.split(',')
            for (var i = 0; i < imgarr.length; i++) {
                str2+='<div class="img_box">'+
                        '<img src="'+imgarr[i]+'" alt=""/>'+
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
                url:'/getDownloadUrl',
                data:{
                    'id':url.fileId,
                    'filetype':url.filetype,
                    'userId':user.id,
                    'sekugou':user.sekugou
                }
            },
            function(data){
                if(data.code===0){
                    // window.open(data.data,'_blank')                    
                    let link = document.createElement('a')
                    document.body.appendChild(link)
                    link.style.display = 'none'
                    link.href = data.data
                    link.target='_blank'
                    link.download = ''
                    link.click()
                    document.body.removeChild(link)
                }else{
                    alert(data.msg)
                }
                console.log(data)
            }
        )
    }
}
