Template.footer.helpers({
    isEnglish : function() {
      return (TAPi18n.getLanguage() == "en") ? "active" : "";
    },
    isFrench : function() {
      return (TAPi18n.getLanguage() == "fr") ? "active" : "";
    },
   
});

Template.footer.events({
  'click .englishChoice': function() {
      TAPi18n.setLanguage("en");
      sAlert.info("You changed the language in English.")
    },
  'click .frenchChoice': function() {
      TAPi18n.setLanguage("fr");
      sAlert.info("Vous avez changé la langue en français.")
    },
   
});