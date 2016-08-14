Template.dashboard.helpers({
    UserCurrentPosts: function() {
    	var start = new Date();
    	return Posts.find({startPost: {$gte: start}},{sort: {startPost: 1}}).fetch();
    },

    UserClosedPosts: function() {
    	var end = new Date();
    	return Posts.find({startPost: {$lt: end}},{sort: {startPost: -1}}).fetch();
		},

  	CountCurrentPosts: function() {
    	var start = new Date();
    	return Posts.find({startPost: {$gte: start}},{sort: {startPost: 1}}).count();
    },

    CountClosedPosts: function() {
    	var end = new Date();
    	return Posts.find({startPost: {$lt: end}},{sort: {startPost: -1}}).count();
		}
});
