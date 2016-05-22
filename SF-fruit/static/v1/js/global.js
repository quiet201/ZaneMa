seajs.config({
    alias: {
      'hammer' : './static/v1/js/plug/hammer.min.js',
      // 'iscroll': './js/plug/iscroll.min.js',
      //'layer'  :'./static/v1/js/plug/layer/layer.js',
      'public' :'./static/v1/js/public.js',
    }
});

seajs.use(['hammer','public'], function(myHam,myPub) {
    $(function() {
        var oHeader = $('.js_header');              //头部
        var oFooter = $('.js_footer');              //底部
        var oGoTop = $('.js_goTop');                //回到顶部
        var oSearchBox = $('.js_searchBox');        //搜索框
        var oSearchArea = $('.js_searchArea');      //搜索框区域
        var oMoveIcon = $('.js_moveIcon');          //加入购物车动态标记
        var oSearchTxt = $('.js_searchTxt');        //搜索框
        var oSearchClear = $('.js_clearBtn');       //搜索框清空
        var maxLWord = $('.js_wordmax');            //最大字数
        var oUserMessage = $('.js_message').find('textarea');  //留言区域

/**********************************  部分公共操作 end   **********************************/

        ChangeFont();

        $(window).on('resize',function() {
            myPub.throttle(ChangeFont,window);
        });


        $(window).on('scroll',function() {
            myPub.throttle(addFixed,window);
            //addFixed ()
        });


        function ChangeFont(fn) {
            var scale = $('body').width() / 640;
            $('html,body').css('font-size', 22 * scale + 'px');
            if(fn)fn();
        }


        function addFixed () {
            var _scrollTop = $(window).scrollTop();
            var _time = null;
            if(_scrollTop > 60) {
                if(oSearchArea.eq(0).css('display') == 'none') {
                    oHeader.addClass('fixedDom').css({top:0});
                    oSearchBox.stop().animate({'opacity':0},200);
                    //oSearchBox
                }
                else {
                    oSearchBox.addClass('fixedDom');
                }
                oGoTop.show();
            }
            else {
                if(oSearchArea.eq(0).css('display') == 'none') {
                    oHeader.removeClass('fixedDom').css({top:'5rem'});
                    oSearchBox.stop().animate({'opacity':1},200);
                }
                else {
                    oSearchBox.removeClass('fixedDom');
                }
                oGoTop.hide();
            }
        }

        // 回到顶部
        oGoTop.hammer().on('tap',function(e) {
            //$(window).scrollTop(0);
            $('html,body').stop().animate({scrollTop: '0px'}, 600);
            myPub.HamstopPropaga();
        });


        // 清空搜索框  oSearchClear
        oSearchClear.hammer().on('tap',function() {
            oSearchTxt.val('');
            $(this).addClass('active').siblings('.js_Text').val('').siblings('.js_error').hide().removeClass('on');
        });

        // 显示清空按钮
        oSearchTxt.on('input propertychange',function() {
            $(this).val() == '' ? oSearchClear.addClass('active') : oSearchClear.removeClass('active');
        });



        //添加购物车动画
        var oShopCarTip = $('.js_userNum');
        var clearTime;
        var oGoodsList = $('.js_goodsList');
        var dbTapOff = true;
        var _H = oGoodsList.find('li').outerHeight(true);
        oGoodsList.find('li').css({'height':_H})
        oGoodsList.hammer().on('tap',function(e) {

            if(dbTapOff) { //阻止多次点击 true 可点击
                dbTapOff = false;
                var _tags = e.gesture.target.nodeName.toLowerCase();
                var _tagsParent = $(_tags);
                var _X = e.gesture.center.x;
                var _Y = e.gesture.center.y;
                //console.log(_tagsParent.parents('.picList').find('h4').text());
                //console.log(_tagsParent.parents('li').find('.js_addCar').attr('_id'));
                //console.log(_tagsParent.parents('li').index());
                if(_tags == 'p' || _tags == 'em' || _tags == 'i') {

                    var aLi = $(this).find('.js_addCar');
                    var sLeft;
                    if(oFooter.find('li').length<=2) {
                        sLeft = "70%";
                    }
                    else {
                        sLeft = "30%";
                    }
                    myPub.AddCarAnimate(_X,_Y,oMoveIcon,sLeft,"94%",function() {
                            oShopCarTip.addClass('mybounceIn');
                            clearTimeout(clearTime);
                            clearTime = setTimeout(function() {
                                oShopCarTip.removeClass('mybounceIn');
                                dbTapOff = true;
                            },800);
                        });
                    myPub.HamstopPropaga();
                }
            }
        });


        // 限制字数
        if(oUserMessage.length>0) {
            myPub.statInputNum(oUserMessage,maxLWord);
        }


/**********************************  部分公共操作 end   **********************************/


   });
});


