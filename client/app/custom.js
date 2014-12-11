function getViewPort() {
  var e = window,
    a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }

  return {
    width: e[a + 'Width'],
    height: e[a + 'Height']
  };
};

function calcMinHeight() {
  var height;

  if ($('body').height() < getViewPort().height) {
    height = getViewPort().height -
    $('.page-header').outerHeight() -
    ($('.page-container').outerHeight() - $('.page-content').outerHeight()) -
    $('.page-prefooter').outerHeight() -
    $('.page-footer').outerHeight();

    $('.page-content').css('min-height', height);
  }
};
