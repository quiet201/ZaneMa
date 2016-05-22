seajs.config({
    alias: {
      'hammer' : './static/v1/js/plug/hammer.min.js',
      // 'iscroll': './js/plug/iscroll.min.js',
      'layer'  :'./static/v1/js/plug/layer/layer.js',
      'public' :'./static/v1/js/public.js',
    }
});


seajs.use(['hammer','layer','public'], function(myHam,myLay,myPub) {
    $(function() {
        var oContactBossBtn = $('.js_contactBoss');     //联系商家信息按钮 js_contactBoss
        var oBossInfo = $('.js_bossInfo');              //商家信息 js_bossInfo
        var oBossName = $('.js_bossName');              //店家名字
        var oReasonList = $('.js_reasonList');          //取消原因选择
        var oCanOrderBtn = $('.js_cancelOrderBtn');     //取消订单按钮
        var oCanOrderInfo = $('.js_cancelOrder');       //取消订单信息
        var oTrueGetBtn = $('.js_trueGetBtn');          //确认收货
        var oDelOrderBtn = $('.js_delOrderBtn');        //删除订单
        var oCancelApply = $('.js_cancelApply');        //取消申请
        var oUserMessage = $('.js_message').find('textarea');  //留言区域
        var maxLWord = $('.js_wordmax');            //最大字数

        // 弹出商家信息列表
        oContactBossBtn.on('click',function() {
            var styleTitle = 'width:100%;  border:none';
            var _sBossInfo= $(this).parents('.js_cBossA').siblings('.js_bossInfo');
            var _index = oBossInfo.index(_sBossInfo);
            var _BossName = oBossName.eq(_index).text();
            _sBossInfo.show();
            myPub.TipTitleLayer('联系商家: '+_BossName,styleTitle, _sBossInfo.html(),function() {
                _sBossInfo.hide();
            });
        });

        // 确认收货提示
        oTrueGetBtn.hammer().on('tap',function() {
            var _cont = '<p class="delTipP" >亲！ 确定您已收到货物了吗？</p><span class="delTipSpan">确认收货后此交易将会关闭</span>';
            myPub.askLayer(_cont,function() {
                // 判断删除店家
                alert('确定');
                myPub.LayerCloseAll();

            },function() {
                alert('取消了');

            },'no');
        });

        // 售后订单被取消弹框
        oCancelApply.hammer().on('tap',function() {
            var _cont = '<p class="delTipP" >此订单正在售后处理</p><span class="delTipSpan">确认收货将取消售后申请</span>';
            myPub.askLayer(_cont,function() {
                // 判断删除店家
                alert('确定');
                myPub.LayerCloseAll();

            },function() {
                alert('取消了');

            },'no');
        });

        // 删除订单提示
        oDelOrderBtn.hammer().on('tap',function() {
            var _cont = '<p class="delTipP" >亲！ 您确定要删除此订单吗？</p><span class="delTipSpan">删除后此订单会永远消失</span>';
            myPub.askLayer(_cont,function() {
                // 判断删除店家
                alert('确定');
                myPub.LayerCloseAll();
            },function() {
                alert('取消了');
            },'no');
        });

        // 放弃支付原因
        oCanOrderBtn.on('click',function() {
            var styleTitle = '请选择取消原因';
            myPub.askLayer(oCanOrderInfo.html(),function() {
                alert('yes');
            },function() {
                alert('no');
                oCanOrderInfo.hide();
            },styleTitle,
            function() {
                oCanOrderInfo.show();
                // 弹框原因选择
                var _oReasonListLi = $('.js_reasonList').find('li');
                var oUserMessage = $('.js_message').find('textarea');  //留言区域
                var maxLWord = $('.js_wordmax');               //最大字数
                _oReasonListLi.hammer().off('tap');
                _oReasonListLi.hammer().on('tap',function() {
                    _oReasonListLi.removeClass('active');
                    $(this).addClass('active');
                });
                myPub.statInputNum(oUserMessage,maxLWord);
            });

        });

        // 原因选择
        oReasonList.find('li').hammer().on('tap',function() {
            oReasonList.find('li').removeClass('active');
            $(this).addClass('active');
        });

    });

});