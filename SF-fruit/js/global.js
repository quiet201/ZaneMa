seajs.config({
    alias: {
      'hammer' : './js/plug/hammer.min.js',
      'iscroll': './js/plug/iscroll.min.js',
      'layer'  :'./js/plug/layer/layer.js',
      'public' :'./js/public.js',
    }
});

seajs.use(['hammer','iscroll','layer','public'], function(myHam,myIsc,myLay,myPub) {
    $(function () {
        var oContain = $('.js_contain');            //内容
        var oIndexSearch = $('.js_IndexSearch');    //底部
        var oSearchArea = $('.js_searchArea');      //搜索框区域
        var oSStart = $('.js_sStart');              //开始搜索按钮
        var oSCancel = $('.js_sCancel');            //取消梭梭按钮
        var oBtnAddCar = $('.js_addCar');           //加入购物车按钮
        var oMoveIcon = $('.js_moveIcon');          //加入购物车动态标记

        //显示搜索框
        oSStart.hammer().on('tap',function(e) {
            oSearchArea.show().eq(0).hide();
            oContain.hide();
            oIndexSearch.show();
        });

        //隐藏搜索框
        oSCancel.hammer().on('tap',function(e) {
            oSearchArea.show().eq(1).hide();
            oContain.show();
            oIndexSearch.hide();
        });

        //添加购物车动画
        myPub.AddCarAnimate(oBtnAddCar,oMoveIcon);

    });


});


