Template.home.rendered = function() {
	document.getElementById("myVideo").playbackRate= 1;

  // fix menu when passed
  $('section.home')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('.fixed.menu').transition('fade in');
        document.getElementById("myVideo").pause();
      },
      onBottomPassedReverse: function() {
        $('.fixed.menu').transition('fade out');
        document.getElementById("myVideo").play();
      }
    });

  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item');

}
