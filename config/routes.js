/* eslint-disable */

const routes = require('next-routes')();

routes.getRequestHandler = function(app, customHandler) {
  const nextHandler = app.getRequestHandler();

  return (req, res) => {
    const { route, query, parsedUrl } = routes.match(req.url);

    if (route) {
      if (customHandler) {
        customHandler({
          req,
          res,
          route,
          query,
        });
      } else {
        app.render(req, res, route.page, query);
      }
    } else {
      nextHandler(req, res, parsedUrl);
    }
  };
};

module.exports = routes
  .add('index', '/', 'index')
  .add('destination-details', '/destinations/:destination', 'destinations/destination')
  .add('article', '/destinations/:destination/:article', 'articles/article')
  .add('error', '/:error', 'error');
