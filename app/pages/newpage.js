
var d3 = window.d3;

var app = {
  init: function(){
    app.render();
  },
  render: function(){
        // do all the visual stuff
    var width = 450;
    var height = 450;

    var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

    var center_x = (width / 2);
    var center_y = (height / 2);

    // Calculate position of the circles, given a d=position and angle=current angle.
    var xpos_gen = function(d, angle) {
      return center_x + (((center_y - radius) * Math.sin(d)) * Math.sin(angle + d));
    };
    var ypos_gen = function(d, angle) {
      return center_y + (((center_y - radius) * Math.cos(d)) * Math.sin(angle + d));
    };

    // Defaults.
    var circle_count = 8;
    var radius = 20;

    // For short.
    var pi = Math.PI;

    // Calculate line start and end coordinates.
    var line_x1 = function(d) {
      return center_x - Math.sin(d) * (width / 2);
    };
    var line_x2 = function(d) {
      return center_x + Math.sin(d) * (width / 2);
    };
    var line_y1 = function(d) {
      return center_y - Math.cos(d) * (height / 2);
    };
    var line_y2 = function(d) {
      return center_y + Math.cos(d) * (height / 2);
    };

    // The data sets the initial position of the circles as well as their
    // relative positions to each other.
    var data = [];

    // Update the drawing with new parameters.
    var generate = function(circle_count) {
      // Refill the data.
      data = [];
      for (var i = 0; i < circle_count; i++) {
        data.push((pi / circle_count) * i);
      }

      // Draw the lines
      var lines = svg.selectAll('line').data(data);
      var line_draw = function(l) {
        l.attr('x1', line_x1)
        .attr('y1', line_y1)
        .attr('x2', line_x2)
        .attr('y2', line_y2);
      };

      lines.enter()
      .append('line')
      .call(line_draw);

      lines.call(line_draw);

      lines.exit().remove();
    };

    generate(circle_count);

    var update = function(angle) {
        // Generate new position functions in each call that depend on the current angle.
      var xpos = function(d) {
        return xpos_gen(d, angle);
      };

      var ypos = function(d) {
        return ypos_gen(d, angle);
      };

      var circles = svg.selectAll('circle').data(data);

      var circle_draw = function(circle) {
        circle.attr('r', radius)
        .attr('cx', xpos)
        .attr('cy', ypos);
      };

      circles.enter()
      .append('circle')
      .call(circle_draw);

      circles.call(circle_draw);

      circles.exit().remove();
    };

    // Base angle to make calculations
    // Ee increase this 1 degree each timer call.
    var angle = 0;

    d3.timer(function() {
      // Increase base angle.
      angle = angle + (Math.PI / 90);

      // Avoid angle growing too much.
      if (angle >= Math.PI * 2) {
        angle = 0;
      }

      // Update visuals.
      update(angle);
    });
    d3.select('#circle-count').on('change', function() {
      generate(this.value);
    });
    d3.select('#radius').on('change', function() {
      radius = this.value;
    });
    d3.select('#show-lines').on('change', function() {
      if (this.checked) {
        d3.selectAll('line').style('display', null);
      }
      else {
        d3.selectAll('line').style('display', 'none');
      }
    });
  }
};
module.exports = app;