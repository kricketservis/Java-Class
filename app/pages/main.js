var $ = window.$;


var app = {
  init: function(){
    app.render();
  },
  render: function(){
    setTimeout(app.startAnimation, 500);
  },
  startAnimation: function(){
    $('.triangles')
      .children()
      .eq(0).animate({bottom: 0, opacity: 1})
      .end().eq(1).animate({bottom: 0, opacity: 1})
      .end().eq(2).animate({bottom: 0, opacity: 1})
      .end().eq(3).animate({bottom: 0, opacity: 1})
      .end().eq(4).animate({bottom: 0, opacity: 1})
      .end().eq(5).animate({bottom: 0, opacity: 1})
      .end().eq(6).animate({bottom: 0, opacity: 1})
      .end().eq(7).animate({bottom: 0, opacity: 1})
      .end().eq(8).animate({bottom: 0, opacity: 1})
      .end().eq(9).animate({bottom: 0, opacity: 1})
      .end().eq(10).animate({bottom: 0, opacity: 1})
      .end().eq(11).animate({bottom: 0, opacity: 1})
      .end().eq(12).animate({bottom: 0, opacity: 1})
      .end().eq(13).animate({bottom: 0, opacity: 1});
  }
}; 

module.exports = app;