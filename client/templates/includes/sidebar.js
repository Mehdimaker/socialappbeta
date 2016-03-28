Template.sidebar.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });

    return active && 'active';
  }
});

Template.sidebar.events({
	'click .modalsignout': function() {
 		$('.ui.basic.modal.disconnect').modal({
	    closable  : true,
	    onDeny    : function(){
	      return ;
	    },
	    onApprove : function() {
	      Meteor.logout();
	    }
	  })
  	.modal('show');
  }
});

