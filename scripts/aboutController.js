//another IIFE, see repo.js for further explaination. 
(function(module) {
  //this is a aboutController object.
  var aboutController = {};
  //this is the function called from routes.js when the URL is selected.
  aboutController.index = function() {
    //this makes the ajax call to the proxy to get github data and passes the repoView.index as a callback.
    repos.requestRepos(repoView.index);
    //end of function 👍🏼
  };

  //another IIFE, see repo.js for further explaination.
  module.aboutController = aboutController;
})(window);
