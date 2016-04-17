define(function(require,exports,module) {
    //加入购物车的动画
    function AddCarAnimate(obj,target) {
        obj.hammer().on('tap',function(e) {
            target.removeClass('MAnimate');
            var _X = e.gesture.center.x;
            var _Y = e.gesture.center.y;
            this.time = null;
            target.css({ 'left':_X,'top':_Y });
            clearTimeout(this.time);
            this.time = setTimeout(function() {
                target.addClass('MAnimate').css({'left':"74%",'top':"95%"});
            },10);
        });
    }
    exports.AddCarAnimate = AddCarAnimate;
});


