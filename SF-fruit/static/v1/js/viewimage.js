seajs.config({
    alias: {
      'mui' : './static/v1/js/plug/mui/mui.min.js',
      'muiZoom'  :'./static/v1/js/plug/mui/mui.zoom.js',
      'muiViewImg' :'./static/v1/js/plug/mui/mui.viewimage.js'
    }
});


seajs.use(['mui'], function() {
    seajs.use(['muiZoom','muiViewImg'], function() { mui.previewImage();});
});