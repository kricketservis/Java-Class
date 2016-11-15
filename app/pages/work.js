var $ = window.$;


var app = {
  init: function(){
    app.render();
  },
  
  render: function(){
    app.createEventHandler();
  },

  createEventHandler: function(){
    $('.workback button').on('click', function(){
      $(this).addClass('animate'); // after click, button spins vertically twice
      var that = this;
      setTimeout(function(){
        var location = $(that).attr('location');
        window.location = location;
      }, 600); 
      // then moves to page when clicked after animation
    });
  }
};

module.exports = app;