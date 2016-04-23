Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',  
	notFoundTemplate: 'notFound',
	waitOn: function(){
		Meteor.subscribe('userData');		
		Meteor.subscribe('userAvatar');
	}
});

Router.route('/', {  name: 'dashboard'});

Router.route('/profile', {	name: 'profile'});

Router.route('/submitpost', {	name: 'postSubmit'});

Router.route('/mapposts', {	name: 'mapPosts'});



Router.route('/myposts', {	
	name: 'myPosts',
	waitOn: function() {    
		//a modifier, ici on ne veux pas charger tout les users   
		Meteor.subscribe('allUsers');  
		Meteor.subscribe('userPosts'); 
	},
	data: function() { 
		userId = Meteor.userId();
		return {posts: Posts.find({ members: { $in: [userId] } })} ;
	}
});


Router.route('/postslist', {	
	name: 'postsList',
	waitOn: function() { 
		//a modifier, ici on ne veux pas charger tout les users   
		Meteor.subscribe('allUsers');  
		Meteor.subscribe('allPosts');  
	},
 	data: function() { 
 		return {posts: Posts.find()} ;
 	}
});



Router.route('/userslist', {  
	name: 'usersList',
	waitOn: function() {    
		Meteor.subscribe('allUsers');  
	}
});


//Debug
Router.route('/testphotos', {  
	name: 'testphotos',
	waitOn: function() {    
		Meteor.subscribe('allAvatars');  
	}
});


//ACCESS DENIED
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
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});






