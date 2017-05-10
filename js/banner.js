;(function(window,document,undefined,$){
    $.fn.leafBanner = function(option){
        var opts = $.extend({},$.fn.leafBanner.methods,$.fn.leafBanner.defaults,option);
        opts.init($(this),opts);
    };
    $.fn.leafBanner.methods = {
        //初始化
        init:function(that,opts){
            this.template(that,opts);
            this.events(that,opts);
        },
        //模板
        template:function(that,opts){
            var imgArr,btnTmp="";
            var html = "<ul class='imgbox'>";
            for(var i=0,len=opts.imgs.length;i<len;i++){
                imgArr = opts.imgs[i];
                html+="<li><a href='"+imgArr.href+"'><img src='"+imgArr.src+"' width='"+opts.width+"' height='"+opts.height+"' alt='"+imgArr.alt+"' /></a></li>";
                btnTmp+="<li></li>";
            }
            html+="</ul><ul class='btn'>"+btnTmp+"</ul>";
            html+="<a href='javascript:void(0);' class='ear prev'>&lt;</a><a href='javascript:void(0);' class='ear next'>&gt;</a>";
            that.append(html);
            that.addClass("banner");
            that.css({width:opts.width,height:opts.height});
            that.find(".ear").css({top:(opts.height - that.find(".ear").height())/2});
            that.find(".btn").css({left:(opts.width - that.find(".btn").width())/2,bottom:"3%"});
        },
        //事件
        events:function(that,opts){
            var index=0,timer=null,nowTime=0,len,currindex=0,width=0,clone=null;
            width = that.find(".imgbox").find("li").width();
            clone = that.find(".imgbox").find("li").first().clone();
            that.find(".imgbox").append(clone);
            len = that.find(".imgbox").children().length;
            that.find(".imgbox").css({width:opts.width*len,height:opts.height});
            that.find(".btn").children().first().addClass("sel");
            that.find(".btn li").mouseover(function(){
                currindex = $(this).index();
                index=currindex;
                that.find(".imgbox").stop(true,true).animate({left:-currindex*width},opts.speed);
                $(this).addClass("sel").siblings().removeClass("sel");
            });
            //下一页
            that.find(".next").click(function(){
                if(new Date() - nowTime > 800){
                    nowTime = new Date();
                    index++;
                    mainPlay();
                }
            });
            //上一页
            that.find(".prev").click(function(){
                if(new Date() - nowTime > 800){
                    nowTime = new Date();
                    index--;
                    mainPlay();
                }
            });
            function mainPlay(){
                if(index==len){
                    that.find(".imgbox").css({"left":0});
                    index=1;
                }
                if(index==len-1){
                    that.find(".btn li").eq(0).addClass("sel").siblings().removeClass("sel");
                }
                if(index==-1){
                     that.find(".imgbox").css({"left":-(len-1)*width});
                    index=len-2;
                }
                that.find(".imgbox").stop(true,true).animate({left:-index*width},opts.speed);
                that.find(".btn li").eq(index).addClass("sel").siblings().removeClass("sel");
            }
            that.hover(function(){
                clearInterval(timer);
            },function(){
                auto_play();
            });
            function auto_play(){
                timer = setInterval(function(){
                    that.find(".next").trigger("click");
                },opts.time*1000);
            }
            auto_play();
        }
    };
    //默认参数
    $.fn.leafBanner.defaults = {
        time:3,
        speed:600,
        width:1000,
        height:500,
        imgs:[]
    }
})(window,document,undefined,jQuery);