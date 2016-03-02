Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('orderMenu', {path: '/orderMenu'});
  this.route('home', {path: '/'});
  this.route('groupManager', {path: '/groupManager'});
});
