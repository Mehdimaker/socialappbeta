getUserLanguage = function () {
  // Put here the logic for determining the user language

  return "fr";
};

Meteor.startup(function () {
    Session.set("showLoadingIndicator", true);

    TAPi18n.setLanguage("en")
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
});