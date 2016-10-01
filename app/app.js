
// base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// import our styles
import './stylesheets/base.scss';
import _ from 'underscore';
import todoController from './pages/todo';
import d3Controller from './pages/newpage';
import canvas3D from './pages/threeExample';


// import multimediaController from './pages/multimedia';
// on document load
$(function(){

  console.log('%c App Started', 'color:green');

  // set default template settings
  _.templateSettings = {
    evaluate:    /{{([\s\S]+?)}}/g,
    interpolate: /{{-([\s\S]+?)}}/g,
    escape:      /{{=([\s\S]+?)}}/g
  };

  // kick of the app!
  // which page are we on??
  if (window.location.pathname === '/pages/todo.html') {
    todoController.init();
  } else if (window.location.pathname === '/pages/multimedia.html') {
    console.log('multimedia page started');
  } else if (window.location.pathname === '/pages/newpage.html') {
    d3Controller.init();
  } else if (window.location.pathname === '/pages/threeExample.html') {
    canvas3D.init(); 
  } 
  


});
