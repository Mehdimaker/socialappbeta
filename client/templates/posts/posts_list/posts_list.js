
Template.postsList.helpers({
  returnPostsToday: function() {

    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);

    return Posts.find({startPost: {$gte: start, $lt: end}},{sort: {startPost: 1}}).fetch();

},
returnPostsTomorrow: function() {
    var start = new Date();
    start.setHours(24,00,00,000);

    var end = new Date();
    end.setHours(48,00,00,000);

    return Posts.find({startPost: {$gte: start, $lt: end}},{sort: {startPost: 1}}).fetch();

},
returnPostsNextdays: function() {
    var start = new Date();
    start.setHours(48,00,00,000);

    return Posts.find({startPost: {$gte: start}},{sort: {startPost: 1}}).fetch();

},
});

