


import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';
import TodoItemView from '../views/r_todoItemView';


var TodoView = Backbone.View.extend({
  el: '.todo-container',
  events: {
    'click .btn-add': 'addTodo'
    // 'keypress .add-input':'addKeypress'
  },
  initialize: function(todos, controller){
    this.controller = controller;
    this.render(todos);
  },
  render: function(todos){
    // var controller = this.controller;
    var controller = this.controller;
    var todosHtml = todos.map(function(todo, index){
      todo.id = index + 1;
      return <TodoItemView key={index} item={todo} controller={controller}/>;
    });

    ReactDOM.render(
      <div>{todosHtml}</div>,
      this.$el.find('.todo-list')[0]
    );
  },
  removeHandlers: function(){
    this.$el.find('.btn-add').off();
    this.$el.find('.btn-input').off();
  },
  addTodo: function(){
    var newTitle = this.$el.find('.add-input').val();
    this.$el.find('.add-input').val('');
    this.controller.addTodo(newTitle);
  },
  addKeypress: function(event){
    var newTitle = this.$el.find('.add-input').val();
    this.controller.addKeypress(event, newTitle);
  },
  removeTodo: function(id){
    this.controller.removeTodo(id);
  },
  editTodo: function(id, newTitle){
    this.controller.editTodo(id, newTitle);
  },
  changeComplete: function(id){
    this.controller.changeComplete(id);
  }
});

module.exports = TodoView;

