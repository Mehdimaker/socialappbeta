Template.backoffice.onCreated( function() {
  this.currentTab = new ReactiveVar( "backUsers" );
});

Template.backoffice.helpers({
  tab: function() {
    
    return Template.instance().currentTab.get();
  },

  tabData: function() {
    var tab = Template.instance().currentTab.get();
    var data = {
      "backUsers": Meteor.users.find(),
      "backPosts": Posts.find().fetch()
    };

    return data[ tab ];
  },
});

Template.backoffice.events({
  'click .nav-pills a': function( event, template ) {
    var currentTab = $( event.target ).closest( "a" );

    currentTab.addClass( "active" );
    $( ".nav-pills a" ).not( currentTab ).removeClass( "active" );

    template.currentTab.set( currentTab.data( "template" ) );
  },
  'click .deleteUser': function() {
    var r = confirm(`Are you sure to delete ${this.username}!`);
    if (r == true) {
       Meteor.call("userDelete", this._id);
    } else {
    }    
  }
  ,
  'click .deletePost': function() {
    var r = confirm(`Are you sure to delete ${this.title}!`);
    if (r == true) {
       Meteor.call("postDelete", this._id);
    } else {
    }    
  }
});