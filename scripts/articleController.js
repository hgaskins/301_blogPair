(function(module) {
  var articlesController = {};
  // DONE: Create the `articles` table when the controller first loads, with
  //       code that was previously in index.html.
  Article.createTable();
  articlesController.index = function() {
    // DONE: Make the function below fetch and render the articles. It should look
    //       very similiar to code you wrote before.
    Article.fetchAll(articleView.initIndexPage);
    // DONE: Hide the main section elements; reveal the #articles section:
    $('main > section').hide();
    $('#about').show();

  };

  module.articlesController = articlesController;
})(window);
