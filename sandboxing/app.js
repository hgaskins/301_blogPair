
var p = $('p');
var q = $('.change');

function setRouteMappings() {
  page.base('/');

  page('', index);
  page('about/me', about);
  page('about/*', contact);
  page('contact/:contactName', contact);
  page('*', notfound); // Catch-all

  page();
}

function index() { q.text('viewing index');}
function about() { q.text('viewing about');}
function contact(ctx) {
  q.text('viewing contact ' + (ctx.params.contactName || ''));
}
function notfound() { q.text('Page not found');}

setRouteMappings();
