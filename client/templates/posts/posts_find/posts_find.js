Template.postsFind.onCreated( function() {
  this.currentTab = new ReactiveVar( "postsList" );
});


Template.postsFind.events({
  'click .nav-pills a': function( event, template ) {
    var currentTab = $( event.target ).closest( "a" );

    currentTab.addClass( "active" );
    $( ".nav-pills a" ).not( currentTab ).removeClass( "active" );

    template.currentTab.set( currentTab.data( "template" ) );
  }
});


Template.postsFind.helpers({
	tab: function() {
    
    return Template.instance().currentTab.get();
  }
});

