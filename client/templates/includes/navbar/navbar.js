Template.navbar.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });

    return active && 'active';
  },
  isAdmin: function(){
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
      return true;
    }else{
      return false;
    }
  }
});


Template.navbar.events({
	'mouseenter .dropdown': function() {
  	$('.dropdown').dropdown({
  	});
	}
});
