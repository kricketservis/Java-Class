
// base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// import our styles
import './stylesheets/base.scss';
import _ from 'underscore';
import navbar from './components/navbar';
import todoController from './pages/todo';
import d3Controller from './pages/newpage';
import canvas3D from './pages/threeExample';
import bbTodoController from './pages/bb_todo';

// import multimediaController from './pages/multimedia';
// on document load
$(function(){

  // kick of the app!
  console.log('%c App Started', 'color:green');

  // set default template settings
  _.templateSettings = {
    evaluate:    /{{([\s\S]+?)}}/g,
    interpolate: /{{-([\s\S]+?)}}/g,
    escape:      /{{=([\s\S]+?)}}/g
  };

  // launch navbar
  navbar.init();
  // My First Router: Which page are we on??
  switch(window.location.pathname){
  case '/pages/todo.html': 
    todoController.init(); 
    break;
  case '/pages/bb_todo.html': 
    new bbTodoController(); 
    break;
  case '/pages/multimedia.html': 
    console.log('multimedia page started');
    break;
  case '/pages/newpage.html': 
    d3Controller.init();
    break;
  case '/pages/threeExample.html': 
    canvas3D.init();  
    break;
  }

  console.log('******************************');
  console.log('Hire me!');
  console.log('kricket.servis@gmail.com');
  console.log('http://www.kricketservis.com/');
  console.log('******************************');

});
