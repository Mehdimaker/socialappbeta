import moment from 'moment';
import "moment/locale/fr";

Template.registerHelper('pluralize', function(n, thing) {
  // pluraliser assez simpliste
  if (n === 0) {
    return '0 ' + thing;
  }else if(n === 1){
  	return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});


Template.registerHelper('authorFindUsername', function(authorId) {
    var user = Meteor.users.findOne({_id: authorId});
    //alert executer deux fois !? probleme ?
    return user.username; 
});
Template.registerHelper('authorFindAvatarMini', function(authorId) {
    var user = Meteor.users.findOne({_id: authorId});
    return user.avatarMini; 
});
Template.registerHelper('authorFindAvatarMega', function(authorId) {
    var user = Meteor.users.findOne({_id: authorId});
    return user.avatarMega; 
});


Template.registerHelper('displayDay', function(date) {
    return moment(date).format("DD/MM/YYYY");
});

Template.registerHelper('displayHour', function(date) {
    return moment(date).format("H:mm");
});


UI.registerHelper('equals', function(a, b) {
    return (a === b);
});

UI.registerHelper('equalsRoute', function(a) {
    return (Router.current().route.getName() === a);
});




// AVERIFIER
UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('MM/DD/YYYY, hh:mm');
});
