
var $ = window.$;
var Handlebars = window.Handlebars;

import lscache from 'lscache';


var database = [];
var model = {
  init: function(){
    var savedData = lscache.get('todos');
    if (savedData){
      database = savedData;
    } else {
      database = [];
    }
  },
  save: function(){
    var dataToSave = JSON.stringify(database);
    lscache.set('todos', dataToSave);
  },
  get: function(){
    return database;
  },
};
  
  
var view = $('script[type="text/x-template"]').html();
  // view in "dumb" template 
    
var controller = {
  init: function(){ 
    model.init();
    // cache some selectors
    controller.addButton = $('.btn-add');
    // start everything up - mediates everything between the view and model
    // init property stores a function 
    controller.compiledTemplate = Handlebars.compile(view);
    controller.renderTemplates();
   
  },
  render: function(compiledTodos){
    // do all the visual stuff
    controller.destroyEventHandlers();
    $('.todo-list').html(compiledTodos.join(''));
    controller.createEventHandlers();
  }, 
  renderTemplates: function(){
    // start everything up 
    var compiledTodos = [];
    model.get().forEach(function(item, index){ // loop that runs each function
       // take the string to pass to the function
      item.id = index + 1;
      var renderedTodo = controller.compiledTemplate(item);
      compiledTodos.push(renderedTodo);      
    });
    controller.render(compiledTodos);
    model.save();
  },
  destroyEventHandlers: function(){
    controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
  },
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler); // Two properties: name of event and function that handles event
  },
  removeHandler:function(event){
    // which one was clicked?
    var index = $(event.currentTarget).parent().parent().index();  
    // update the database 
    model.get().splice(index, 1); 
    // update the view
    controller.renderTemplates();
  },
  checkedHandler: function(event){
    // which checkbox?
    var index = $(event.currentTarget).parent().parent().index(); 
    // update the database
    model.get()[index].completed = !model.get()[index].completed;
    // view updates automatically, yay HTML!
    model.save();  
  },  

  addTodoHandler: function(){
    var newTitle = $('.add-input').val();
    if (newTitle === '') return;
    model.get().push({
      title: newTitle,
      completed: false
    });
    $('.add-input').val(''); // Getter and setter - when you don't provide an argument it gets information and when you do provide an argument it sets information
    controller.renderTemplates();
  }
};
  
module.exports = controller; 
