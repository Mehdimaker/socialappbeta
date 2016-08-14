GoogleMaps.load({ 
  v: '3', 
  key: Meteor.settings.public.googleapp, 
  libraries: 'geometry,places' });