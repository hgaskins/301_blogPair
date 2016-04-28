(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };


  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };
    //SCAA n detail, explain how .findWhere() works.
    /*
    Article.findWhere() passes a string, a search parameter and a function to webdb.execute which then exectutes the SQL query
    and calls the function on the results.

    The authorName part is whatever string follows /author/ within the URL. page.js passes this in the ctx object when calling an
    articlesController function.

    page() on the routes.js script starts an event handler which watches the URL for changes, matches them to previously specified strings, and does the appropriately defined function calls.

    ctx is the object passed to functions called from URL matches implemented by page.js.
    */
    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
