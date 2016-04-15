// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};


myObj = {};

articleView.initNewArticlePage = function() {
  // DONE: Ensure the main .tab-content area is revealed. We might add more tabs later.
  $('.tab-content').show();
  // DONE: The new articles we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we
  // have data to export. Also, let's add focus event to help us select the JSON.

  $('#new-form').keypress(function() {
    $('#export-field').css('display', 'block');
  });

  // DONE: Add an event handler to update the preview and the export field if any inputs change.

  var articleTitle;
  var articleCategory;
  var articleAuthor;
  var articleAuthorURL;
  var articleBody;
  exportField = $('#article-json');

  function updateExport() {
    exportField.val(JSON.stringify(myObj));
    articleView.create();
  }



  $('#article-title').keydown(function() {
    articleTitle = $('#article-title').val();
    myObj.title = articleTitle;
    updateExport();
    // $('#export-field').prepend(articleTitle);
    console.log(myObj);
  });

  $('#article-category').keydown(function() {
    articleCategory = $('#article-category').val();
    myObj.category = articleCategory;
    updateExport();
    // $('#export-field').prepend(articleCategory);
    console.log(myObj);
  });

  $('#article-author').keydown(function() {
    articleAuthor = $('#article-author').val();
    myObj.author = articleAuthor;
    updateExport();
    // $('#export-field').prepend(articleAuthor);
    console.log(myObj);
  });

  $('#article-author-url').keydown(function() {
    articleAuthorURL = $('#article-author-url').val();
    myObj.authorUrl = articleAuthorURL;
    updateExport();
    // $('#export-field').prepend(articleAuthorURL);
    console.log(myObj);
  });

  $('#article-body').keydown(function() {
    articleBody = $('#article-body').val();
    myObj.body = articleBody;
    updateExport();
    // $('#export-field').prepend(articleBody);
    console.log(myObj);
  });



};

//to highlight #article-json section for copy paste
$('#article-json').on('focus', function() {
  $(this).select();
});


articleView.create = function() {
  // DONE: Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  $('#articles').empty();


  // DONE: Instantiate an article based on what's in the form fields:
  var newArticle = new Article(myObj);


  // DONE: Use our interface to the Handblebars template to put this new article into the DOM:
  if (typeof newArticle.body !== 'undefined') {
    $('#articles').append(newArticle.toHtml());
    console.log('the body exists');
  } else {
    console.log('body does not exist yet');
  }

  // TODO: Activate the highlighting of any code blocks:
  $('.article-body').filter('pre').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  // TODO: Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:

};


articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
  articleView.create();
};
