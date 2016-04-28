/*
  This handles requests with no additional URL specificed.
  It calls articlesController.loadAll, and passes it articlesController.index as a callback function.
  This is also called via a page redirect if /category or /author is called without a parameter.

  for the records, / plays a mean guitar.

*/
page('/',
  articlesController.loadAll,
  articlesController.index);

/*
  This handles requests with the about URL specified, either directly or from the nav menu link.  This calls aboutController.index.
*/
page('/about', aboutController.index);

/*
  This handles URLs that specify a particular id after the article.  It calls articlesController.loadById, which creates a dataArticle function, and passes it to Article.findWhere along with the id from the URL and the string to search in the SQL query.  Article.findWhere creates the SQL query, calls webDB.execute and passes it dataArticle.  webDB.execute submits the query, receives the data, and calls articleData, which collects the results from the SQL query, then calls next(), which is passed from here as articlesController.index.

  This path is called from the Read On link on each displayed article.
*/
page('/article/:id',
  articlesController.loadById,
  articlesController.index);

// Redirect home if the default filter option is selected:
/*
  These function has no parameters to pass, and so redirects the user to the first request, which just displays all articles.
*/
page('/category', '/');
/*
  These function has no parameters to pass, and so redirects the user to the first request, which just displays all articles.
*/
page('/author', '/');

/*
  This follows the same pathway as the article/:id function call, except it creates a different SQL query string, and searches by author name.

  This is called from the author filter.
*/
page('/author/:authorName',
  articlesController.loadByAuthor,
  articlesController.index);
/*
  This follows the same pathway as the article/:id function call, except it creates a different SQL query string, and searches by category name.

  This is called from the category filter.
*/
page('/category/:categoryName',
  articlesController.loadByCategory,
  articlesController.index);

/*
  This starts the URL processing.
*/
page();
