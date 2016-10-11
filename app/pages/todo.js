
var $ = window.$;
import _ from 'underscore';
import model from '../models/todoModel';
import view from 'text!../views/todoItem.tpl';

    
var controller = {
  init: function(){ 
    model.init();
    // cache a jquery selector
    controller.addButton = $('.btn-add');
    // compile todoItem template
    controller.compiledTemplate = _.template(view);
    // render the todo item template
    controller.renderTemplates();
   
  },
  // do all the visual stuff
  render: function(compiledTodos){
    // remove all the even handlers for the todo app
    // event handlers are functions that get run when the event happens
    controller.destroyEventHandlers();
    // Compiled todos is an array - we are joining array elements together to make one long string
    // Put the long string into the HTML element with a class of "todo-list" 
    $('.todo-list').html(compiledTodos.join(''));
    // now that all the todos have been added to the DOM
    // add all of the event handlers for the todo app
    controller.createEventHandlers();
  }, 

  renderTemplates: function(){
    // start everything up 
    // get the database
    // loop over each iten in the database
    var compiledTodos = model.get().map(function(item, index){ 
       // create an id equal to index + 1
       // the + 1 is to make more human readable, not start at 0
       // ID is required by our view
      item.id = index + 1;
      // Replace {{id}} with the items id value
      return controller.compiledTemplate(item); 
    }); // end of forEach
    // Pass list of todos to the render function
    controller.render(compiledTodos);
    // Tell the model to save our data
    model.save();
  },
  // get ready to re-render
  destroyEventHandlers: function(){
    controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
    $('.edit').off();
  },
  // add the event handlers
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);
    $('.add-input').on('keypress', controller.addTodoKeypress);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler); // Two properties: name of event and function that handles event
    // edit button handler
    $('.edit').on('click', controller.editHandler);
  },
  addTodoKeypress: function(event){
    if (event.which === 13) {
      // they hit enter!
      controller.addTodoHandler(event);
    }
  },
  // event handler for the edit button
  editHandler: function(event){
    // which item to edit??
    var index = $(event.currentTarget).parent().parent().index(); 
    var $item = $('.todo').eq(index); 
    // when they click on edit, title text disappears
    $item.find('.todo-title').addClass('hidden');
    // text input appears
    $item.find('.todo-title-edit').removeClass('hidden');
    // edit button replaced by saved button
    $item.find('.edit').addClass('hidden');
    $item.find('.save').removeClass('hidden');
    // make check when they click on save btn
    $item.find('.save').on('click', controller.updateTitle);
    $item.find('.todo-title-edit input').on('keypress', controller.updateTitleKeypress);
  },
  // handler update title on Enter
  updateTitleKeypress: function(event){
    if (event.which === 13) {
      // they hit enter!
      controller.updateTitle(event);
    }
  },
  // save edit button handler
  updateTitle: function(){
    // which title
    var index = $(event.currentTarget).parent().parent().index(); 
    var $item = $('.todo').eq(index); 
    $item.find('.save').off();
    $item.find('.todo-title-edit input').off();
    var newTodoTitle = $item.find('.todo-title-edit input').val();
    // update the database
    model.get()[index].title = newTodoTitle;
    model.save();
    controller.renderTemplates();
  },
  // event handler for the close X buttons
  // Deletes the todo
  removeHandler:function(event){
    // which one was clicked?
    var index = $(event.currentTarget).parent().parent().index();  
    // update the database 
    model.get().splice(index, 1); 
    // update the view
    controller.renderTemplates();
  },
  // event handler for the checkboxes
  checkedHandler: function(event){
    // which checkbox?
    var index = $(event.currentTarget).parent().parent().index(); 
    // update the database
    model.get()[index].completed = !model.get()[index].completed;
    // console.log(model[index])
    model.save();  
    controller.renderTemplates();
  },  
  // event handler for the add button
  // creates a new todo
  
  addTodoHandler: function(){
    // reads the input using jquery.val()
    var newTitle = $('.add-input').val();
    // when a function hits a return block is a quick exit
    if (newTitle === '') return; 
    // model.get() returns the database
    // push() adds an item to the databse
    model.get().push({
      title: newTitle,
      completed: false
    });
    // clear the text out of the box
    $('.add-input').val(''); // Getter and setter - when you don't provide an argument it gets information and when you do provide an argument it sets information
    // update the display
    controller.renderTemplates();
  }
};
// specifies what will be returned when imported  
module.exports = controller; 
