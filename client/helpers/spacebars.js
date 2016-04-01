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


UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('MM/DD/YYYY, hh:mm');
});