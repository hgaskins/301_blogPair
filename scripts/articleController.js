(function(module) {
  var articlesController = {};


  articlesController.index = function() {
    // TODO: Create the `articles` table when the controller first loads, with
    //       code that was previously in index.html.
    // TODO: Make the function below fetch and render the articles. It should look
    //       very similiar to code you wrote before.
    // TODO: Hide the main section elements; reveal the #articles section:

  };

  module.articlesController = articlesController;
})(window);

Article.createTable();
Article.fetchAll(articleView.initIndexPage);
