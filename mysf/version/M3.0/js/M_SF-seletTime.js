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
        var oSF_seletDay = $('.js_SF-seletDay');  // 产品类型选择day
        var oSF_seletDayScroll = new myPub.ScrollBar();
        oSF_seletDayScroll.AddScroll(oSF_seletDay[0],{
            'useTransition':false,
            'mouseWheel':true,
        });

        // oSF_seletDayScroll.ReScroll()

        // 选中和不选 day
        oSF_seletDay.hammer().on('tap',function(e) {
            var _eTar = e.gesture.target;
            var _target;
            _eTar.nodeName.toLowerCase() == 'li' ? _target = $(_eTar) : _target = $(_eTar).parents('li');

            if(_target.hasClass('act_out')) {
                return;
            }
            else {
                _target.parents('ul').find('li').removeClass('act_in');
                if(_target.hasClass('act_in')) {
                    _target.removeClass('act_in');
                }
                else {

                    _target.addClass('act_in');
                }
            }
        });


    });

});


