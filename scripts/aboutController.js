(function(module) {
  var aboutController = {};

  // DONE: Write this function to hide all main section elements,
  //       then show only the #about section.
  aboutController.index = function() {
    $('main > section').hide();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window);
