Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',  
	notFoundTemplate: 'notFound',
});

Router.route('/', {  name: 'dashboard'});
Router.route('/register', {  name: 'register'});


Router.route('/users', {  
	name: 'usersList',
	waitOn: function() {    
		return Meteor.subscribe('allUsers');  
	},
	data: function() { return Meteor.users.find(); }
});






