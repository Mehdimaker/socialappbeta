/*============================================
=            LAYOUT CONFIGURATION            =
============================================*/
Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',  
	notFoundTemplate: 'notFound',
	waitOn: function(){
		return [
		Meteor.subscribe('userData'),
		Meteor.subscribe('userAvatar')];
	}
});
/*=============================
=            PAGES            =
=============================*/
Router.route('/', {  
	name: 'home'
});

Router.route('/dashboard', {  
	name: 'dashboard',
	waitOn: function() { 
		//a modifier, ici on ne veux pas charger tout les users   
		return [
			Meteor.subscribe('allUsers'),  
			Meteor.subscribe('userPosts')
		];
	},
 	data: function() { 
 		return {posts: Posts.find({ members: { $in: [Meteor.userId()] } },{sort: {startPost: -1}})} ;
 	}
});

Router.route('/editProfile', {	
	name: 'editProfile'
});

Router.route('/submitpost', {	
	name: 'postSubmit'
});

Router.route('/postsmap', {	
	name: 'postsMap',	
	waitOn: function() {    
		//a modifier, ici on ne veux pas charger tout les users   
		Meteor.subscribe('allPosts'); 
	}
});

Router.route('/postslist', {	
	name: 'postsList',
	waitOn: function() { 
		//a modifier, ici on ne veux pas charger tout les users   
		return [
			Meteor.subscribe('allUsers'),  
			Meteor.subscribe('allPosts')
		];
	}
});

Router.route('/posts/:_id', {  
	name: 'postPage',
	 waitOn: function() {    
	 		return [
	 			Meteor.subscribe('allUsers'),
	 		 	Meteor.subscribe('singlePost', this.params._id),
	 		 	Meteor.subscribe('comments', this.params._id)    
	 		];
	 },
 	data: function() { 
 		return Posts.findOne(this.params._id); 
 	}
});

Router.route('/edit/:_id', {  
	name: 'postEdit',
	 waitOn: function() {    
	 		return [
	 		 	Meteor.subscribe('singlePost', this.params._id),
	 		];
	 },
 	data: function() { 
 		return Posts.findOne(this.params._id); 
 	}
});

Router.route('/userslist', {  
	name: 'usersList',
	waitOn: function() {    
		Meteor.subscribe('allUsers');  
	}
});

Router.route('/testphotos', { 
	name: 'testphotos',
	waitOn: function() {    
		Meteor.subscribe('allAvatars');  
	}
});


/*=====================================
=            ACCESS DENIED            =
=====================================*/
var requireLogin = function() {    
	if (! Meteor.user()) {        
		if (Meteor.loggingIn()) {            
			this.render(this.loadingTemplate);        
		} 
		else {            
			this.render('accessDenied');        
		}    
	} 
	else {        
		this.next();    
	}
}
Router.onBeforeAction(requireLogin, {only: ['postSubmit','usersList','dashboard','editProfile']});






