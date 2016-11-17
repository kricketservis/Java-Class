var $ = window.$;


var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('body').css({display: 'block'});
    setTimeout(app.startAnimation, 500);
  },
  startAnimation: function(){
    $('.triangles')
      .children()
      .eq(0).animate({bottom: 0, opacity: 1}, 600)
      .end().eq(1).animate({bottom: 0, opacity: 1}, 700)
      .end().eq(2).animate({bottom: 0, opacity: 1}, 800)
      .end().eq(3).animate({bottom: 0, opacity: 1}, 400)
      .end().eq(4).animate({bottom: 0, opacity: 1}, 500)
      .end().eq(5).animate({bottom: 0, opacity: 1}, 900)
      .end().eq(6).animate({bottom: 0, opacity: 1}, 200)
      .end().eq(7).animate({bottom: 0, opacity: 1}, 100)
      .end().eq(8).animate({bottom: 0, opacity: 1}, 200)
      .end().eq(9).animate({bottom: 0, opacity: 1}, 700)
      .end().eq(10).animate({bottom: 0, opacity: 1})
      .end().eq(11).animate({bottom: 0, opacity: 1}, 400)
      .end().eq(12).animate({bottom: 0, opacity: 1})
      .end().eq(13).animate({bottom: 0, opacity: 1});
  }
}; 

module.exports = app;