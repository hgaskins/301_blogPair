//another IIFE, see repo.js for further explaination.
(function(module) {
  // defines the repoView object.
  var repoView = {};

  // defins a local function ui
  var ui = function() {
    // caches a DOM query of #about.
    var $about = $('#about'); // Best practice: Cache the DOM query if it's used more than once.

    // selects the 'ul' element in #about, and removes all child elements.
    $about.find('ul').empty();
    // shows the #about element and hides all the sibling elements.
    $about.show().siblings().hide();

    // ends the function. :p
  };

  /*
    defines a local function 'render', which acceps an object 'repo' and returns
    a DOM element containing a li with the title of the URL and a link to the repo URL
  */
  var render = function(repo) {
    // creates an LI element.
    return $('<li>')
    // sets the .html content of the element just made with the URL and Title from the repo object passed to render().
      .html('<a href="' + repo.html_url + '">' + repo.full_name + '</a>');
  };

  // Function passed as the callback to repos.requestRepos in aboutController.
  repoView.index = function() {
    // calls ui() to go full-Anakin on all child elements.
    ui();

    // Selects the ul in #about, and appends the results of the repos.with().map() call.
    $('#about ul').append(
      // calls repos.with to show only those github repos with a non-zero forks_count property, then calls .map(),which calls render on each element returned to create the list of dom elements for each repo which are then appended to the #about ul.
      repos.with('forks_count').map(render)
    );
  };

  //another IIFE, see repo.js for further explaination. 🙏
  module.repoView = repoView;
})(window);
