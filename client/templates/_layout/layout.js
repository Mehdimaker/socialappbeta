
if (Accounts._resetPasswordToken) {
	Session.set('resetPassword', Accounts._resetPasswordToken);
} 

Template.layout.helpers({
	resetPassword : function(t) {
		return Session.get('resetPassword');
	},
	routeIsNot : function(routeName){
		if (Router.current().route.getName() === routeName) {
			return false;
		}else{
			return true;
		}
	},
	members : function(){
		return Meteor.users.find();
	}
});


Template.layout.events({

	'click .modalsignout': function() {
		$('.ui.basic.modal.signout').modal({
			closable  : true,
			onDeny    : function(){
				return ;
			},
			onApprove : function() {
				Meteor.logout();
				Router.go('/');
			}
		})
		.modal('show');
	},


	'click .modalsignS': function(event) {
	//remove value input and errors msg
	$('.ui.form').form('clear');
	//show modal
	if($(event.target).data("modal") == "signin"){
		$('.modal.signin').modal('show');
	}else if ($(event.target).data("modal") == "signup"){
		$('.modal.signup').modal('show');
	}
	
	//initialize the couple of modal
	$('.coupled.modal').modal({allowMultiple: false});
	$('.modal.signup').modal('attach events', '.modal.signin .menusignup');
	$('.modal.signin').modal('attach events', '.modal.signup .menusignin');
	$('.modal.forgotpass').modal('attach events', '.modal.signin .menuforgotpass');

/*===================================
=            FORM SIGNIN            =
===================================*/
$('.ui.form.signin').form({
	onSuccess : function(){
		$(".signin .ui.button.submit").addClass("loading");

		var email = $('#signin-email').val();
		var password = $('#signin-password').val();
		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				console.log('login failed');
				sAlert.error('Login failed!');
				$(".signin .ui.button.submit").removeClass("loading");
				return;
			} else {
				console.log('login success');
				$(".signin .ui.button.submit").removeClass("loading");
				$('.modal.signin').modal('hide');
				Session.set("sAlert-signIn", true);
				Router.go('/dashboard');
			}
		}); 
	},
	fields: {
		password: {
			identifier: 'password',
			rules: [
			{
				type   : 'empty',
				prompt : 'Please enter a password'
			}
			]
		},
		email: {
			identifier: 'email',
			rules: [
			{
				type   : 'empty',
				prompt : 'Please enter a email'
			},
			{
				type   : 'email',
				prompt : 'Please enter a correct email'
			}
			]
		}
	}
});


/*===================================
=            FORM SIGNUP            =
===================================*/  
$('.ui.form.signup').form({
	onSuccess : function(){
		$(".signup .ui.button.submit").addClass("loading");

		var email = $('#signup-email').val();
		var password = $('#signup-password').val();
		var username = $('#signup-username').val();

		Accounts.createUser({ 
			username: username, 
			email: email, 
			password : password   
		}, function(err){
			if (err) {
				$(".signup .ui.button.submit").removeClass("loading");
				console.log('creation failed');
				return false;
			} else {
				$('.modal.signup').modal('hide');
				$(".signup .ui.button.submit").removeClass("loading");
				console.log('creation success');
				Session.set("sAlert-signUp", true);
				Router.go('/dashboard');



				updateUser= {
					avatarMini : "/user_icon_30.png",
					avatarMega : "/user_icon_300.png",
					bio : "no bio",
					gender: "no gender",
					location: "nc",
					language: "nc"
				}

				var userId = Meteor.userId();
				Meteor.users.update({_id:userId}, { $set: updateUser });
			}
		}); 
		
	},
	fields: {
		username: {
			identifier: 'username',
			rules:[
			{
				type   : 'empty',
				prompt : 'Please enter a username'
			},
			{
				type   : 'minLength[5]',
				prompt : 'Your username must be at least {ruleValue} characters'
			}
			,
			{
				type   : 'maxLength[16]',
				prompt : 'Your username must be at max {ruleValue} characters'
			},
			{
				type   : 'regExp[/^[a-z0-9_-]{5,16}$/gi]',
				prompt : 'Your username is not correct, please dont use special characters and no space.'
			}
			]
		},
		password: {
			identifier: 'password',
			rules: [
			{
				type   : 'empty',
				prompt : 'Please enter a password'
			},
			{
				type   : 'minLength[6]',
				prompt : 'Your password must be at least {ruleValue} characters'
			}
			]
		},
		email: {
			identifier: 'email',
			rules: [
			{
				type   : 'empty',
				prompt : 'Please enter a email'
			},
			{
				type   : 'email',
				prompt : 'Please enter a correct email'
			}
			]
		}
	}
});

/*=======================================
=            FORM FORGOTPASS            =
=======================================*/
$('.ui.form.forgotpass').form({
	onSuccess : function(){
		var email = $('#forgotpass-email').val();
		
		Accounts.forgotPassword({email: email}, function(err){
			if (err)
				alert('Password Reset Error &amp; Doh');
			else {
				alert('Email Sent &amp; Please check your email.');
			}
		});

	},
	fields: {
		email: {
			identifier: 'email',
			rules: [
			{
				type   : 'empty',
				prompt : 'Please enter a email'
			},
			{
				type   : 'email',
				prompt : 'Please enter a correct email'
			}
			]
		}
	}
});


}

});

