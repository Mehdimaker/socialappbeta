Template.newpass.onRendered(function () {
        $('.ui.modal.newpass').modal('show');
        //form newpass
		    $('.ui.form.newpass').form({
		      inline:true,
		      onSuccess : function(){
		        var password = $('#newpass-password').val();
		    
		       Accounts.resetPassword(Session.get('resetPassword'), password, function(err){
            if (err)
              alert('Password Reset Error &amp; Sorry');
            else {
              alert('Password Reset Succes !');
              Session.set('resetPassword', null);
            }
					        $('.ui.modal.newpass').modal('hide');
          });
		      },
		      fields: {
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
		   	 }
				});
});