seajs.config({
    alias: {
      'hammer' : '../../../version/M3.0/js/M_plug/hammer.min.js',
      'iscroll': '../../../version/M3.0/js/M_plug/iscroll.min.js',
      //'layer'  :'../../../version/M3.0/js/M_plug/layer/layer.js',
      'public' :'../../../version/M3.0/js/M_public.js',
    }
});

seajs.use(['hammer','iscroll','public'], function(myHam,myIsc,myPub) {
    $(function() {
        // 寄件 收件人 地址选择
        var oSeletArea = $('.js_seletArea');
        var oSeletAddrBtn = $('.js_seletAddrBtn');
        var oSeletAreaScroll = new myPub.ScrollBar();
        oSeletAreaScroll.AddScroll(oSeletArea[0],{
            'useTransition':false,
            'mouseWheel':true,
        });

        oSeletAddrBtn.on('click',function(e) {
            setTimeout(function() {
                oSeletAreaScroll.ReScroll();
            },100);
            e.stopPropagation();
        });

        // 产品类型选择day
        var oSF_seletDay = $('.js_SF-seletDay');
        var oShowDay = $('.js_showDay');
        var oShowTime = $('.js_showTime');
        var oProductTypePage = $('.js_productType');

        // 选中和不选 day
        oSF_seletDay.hammer().on('tap',function(e) {
            var _eTar = e.gesture.target;
            var _target;
            _eTar.nodeName.toLowerCase() == 'li' ? _target = $(_eTar) : _target = $(_eTar).parents('li');

            //产品类型选择
            //判断是否有class act_out 有表示过期 没有表示可选  act_in 表示选中
            if(_target.hasClass('act_out')) {
                alert("已经过期了")
                return;
            }
            else {
                _target.parents('ul').find('li').removeClass('act_in');
                if(_target.hasClass('act_in')) {
                    _target.removeClass('act_in');
                }
                else {
                    _target.addClass('act_in');
                    var _day = _target.find('.js_seletDay').text();
                    var _time = _target.find('.js_seletTime').text();
                    oShowDay.text(_day);
                    oShowTime.find('dt').hide().eq(1).text(_time).show();

                    $('.order_layer_iframe').stop().animate({'height':0},300,function() {
                        $('.order_layer_shade').hide();
                        oProductTypePage.hide();
                    });
                }
            }
            myPub.HamstopPropaga()
        });

        // 寄件时间选择
        var oJTime = $('.js_JTime'); //寄件时间选择页面
        var oDayselet = $('.js_dayselet');
        var oTimeselet = $('.js_timeselet');
        var oSendTime = $('.js_sendTime'); //寄件时间按钮
        var oDayTimeTxt = $('.js_dayTimeTxt'); //最后显示时间
        var oCancelSelet = $('.js_cancelSelet'); //取消选择

        var oTimeScroll = new myPub.ScrollBar();
        oTimeScroll.AddScroll(oTimeselet[0],{
            'useTransition':false,
            'mouseWheel':true,
        });


        oSendTime.on('click',function() {
            setLiWidth(oDayselet,oTimeselet,function() {
                oTimeScroll.ReScroll();
            });

        });

        //取消预约
        oCancelSelet.on('click',function() {
            $('.order_layer_iframe').stop().animate({'height':0},300,function() {
                $('.order_layer_shade').hide();
                oJTime.hide();
            });
        });

        // 确定

        // 日期选择
        TapChecked (oDayselet,'li','active',function() {
            oTimeScroll.ReScroll();
        });

        // 时间选择
        TapChecked (oTimeselet,'li','active',function() {
            $('.order_layer_iframe').stop().animate({'height':0},300,function() {
                $('.order_layer_shade').hide();
                oJTime.hide();
                oDayTimeTxt.text(oDayselet.find('li.active p').text()+' '+oTimeselet.find('li.active span').text());

            });
        });


        // 选中方法
        function TapChecked (obj,sTarget,clsName,callBack) {
            obj.hammer().on('tap',function(e) {
                var _tar = e.gesture.target;
                var _target;
                _tar.nodeName.toLowerCase() == sTarget ? _target = $(_tar) : _target = $(_tar).parents(sTarget);
                obj.find(sTarget).removeClass(clsName);
                _target.addClass(clsName);
                if(callBack)callBack();
            });
        }



        // 设置li宽度
        function setLiWidth(obj,tar,callBack) {
            var _W = obj.find('li').width();
            tar.find('li').css({'width':_W});
            if(callBack)callBack();
        }

    });

});


