var $ = window.$;


var app = {
  init: function(){
    app.render();
  },
  
  render: function(){
    $('body').css({display: 'block'});
    app.createEventHandler();
    setTimeout(function(){
      $('.flex-item-1').addClass('ready');
      $('.flex-item-2').addClass('ready');
    }, 200);
  },

  createEventHandler: function(){
    $('.buttons button').on('click', function(){
      $(this).addClass('animate'); // after click, button spins vertically twice
      var that = this;
      setTimeout(function(){
        var location = $(that).attr('location');
        window.location = location;
      }, 500); 
      // then moves to page when clicked after animation
    });
  }
};

module.exports = app;