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
			Meteor.subscribe('startPosts')
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
/*==================================
=            BACKOFFICE            =
==================================*/




Router.route('/back', {  
	name: 'backoffice',
	waitOn: function(){
		return [
			Meteor.subscribe('allUsers'),
			Meteor.subscribe('allPosts')
		];
	}
});

var requireAdmin = function() {    
	if (!Roles.userIsInRole(Meteor.userId(), ['admin']) ) {                   
			this.render('accessDenied');        
	} 
	else {        
		this.next();    
	}
}
Router.onBeforeAction(requireAdmin, {only: ['backoffice']});
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

/*==============================
=            sALert            =
==============================*/

var displaySAlert = function() {    
	if (Session.get("sAlert-isCreate")) {        
    sAlert.success('Your training has been created !');
		Session.set("sAlert-isCreate", false);
		this.next();    
	}
	else if(Session.get("sAlert-signIn")) {        
    sAlert.success('Welcome in your dashboard !');
		Session.set("sAlert-signIn", false);
		this.next();    
	} 
	else if(Session.get("sAlert-signUp")) {        
    sAlert.success('Congratulation your account has been created!');
		Session.set("sAlert-signUp", false);
		this.next();    
	} 
	else {        
		this.next();    
	}
}
Router.onBeforeAction(displaySAlert, {only: ['postPage','dashboard']});






