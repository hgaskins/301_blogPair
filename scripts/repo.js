/*
This IIFE creates a local scope, preventing access to global variables from elsewhere. This allows us to export specific
data, in this case the repos object.
*/
(function(module) {
  //This is the repos object that we export
  var repos = {};

  //What is repos.all?
  /*
  This is the arry that holds all of the objects returned from the JSON query.
  */
  repos.all = [];

  //a function method to initiate the AJAX request.
  repos.requestRepos = function(callback) {
    //How does $.get() differ from $.getJSON() and $.ajax()?
    /*
    $.get() is a shorthand for $.ajax() with a predefined set of parameters.
    $.getJSON() is another shorthand for $.ajax() with a more specific set of parameters.
    $.ajax() is the underlying mechanism for both of these, and allows for much more flexibility.
    */
    $.get('/github/user/repos' + '?per_page=100' + '&sort=updated')
    //What happens due to the two chained $.done() functions?
    /*
    They are invoked in the order they are added
    */
      // How many .done() callbacks run?
      // They run when the invoked function is completed. In this case the first one runs when the ajax request is complete. If the ajax request fails the done callback is never invoked.
        //If no callbacks run, why not?
        //the ajax call failed.
        //If one runs, which one runs, and what determines that?
        //If just one runs, it is the first, and the second one only runs if the first completes properly. If the first callback fails, the second one will not run.
        //If both callbacks run, what order do they run in? Does that order ever change - if so, under what conditions?
        //They are run in the order that they are chained together. Dpenedent on the success of the previous callback.
    .done(function(data, message, xhr) { repos.all = data; })
    //after completing the previous done callback, this done invokes the function passed as a parameter to repos.requestRepos.
    .done(callback);
  };
  // Describe how repos.with() works:
    // What does .filter() do in general, and what does it do specifically in this code?
    //In general, .filter() creates a new array with elements of the original array based on search parameters. Specifically in this code, the filter() creates an array of repo objects whose attr key is truthy.
    //What is the anonymous function's param repo?
    //The anonymous function's param repo is an object describing a repo on github.
    //What is repo[attr]?
    //attr is a key in the repos object. It is passed to repos.with and the .filter method checks to see if the value is truthy.
    //What does repos.all.filter return?
    // This returns a repo object if value of the attr key is not falsy.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) { return repo[attr]; });
  };
  //This makes the repos object available to the window scope.
  module.repos = repos;
//This specificies the scope that module is exposed to. Modeule.repo is available to window. 
})(window);
