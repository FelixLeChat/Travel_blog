const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const proxyMiddleware = require('http-proxy-middleware');
const path = require('path');
const next = require('next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const i18nextNamespaces = require('../app/utils/i18nextNamespaces');


const dev = process.env.NODE_ENV !== 'production';
let devProxy;
if (dev) {
  dotenv.config();
}
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });

const routes = require('../config/routes');
const i18n = require('../lib/i18n');

const handle = routes.getRequestHandler(app);

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      detection: {
        order: ['path'],
        lookupPath: 'locale',
        lookupFromPathIndex: 0,
      },
      react: {
        wait: false,
        withRef: false,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
      },
      whitelist: ['en', 'fr'],
      fallbackLng: 'en',
      preload: ['en', 'fr'], // preload all langages
      ns: i18nextNamespaces, // need to preload all the namespaces
      backend: {
        loadPath: path.join(__dirname, '../config/locales/{{lng}}/{{ns}}.json'),
        addPath: path.join(__dirname, '../config/locales/{{lng}}/{{ns}}.missing.json'),
      },
    },
    () => {
      app.prepare().then(() => {
        const server = express();

        // Use morgan for logs
        server.use(morgan('combined'));

        // Use helmet for enhance security
        server.use(helmet());

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n));

        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '../config/locales')));

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));

        // Set up the proxy.
        if (dev && devProxy) {
          Object.keys(devProxy).forEach((context) => {
            server.use(proxyMiddleware(context, devProxy[context]));
          });
        }

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
        });
      });
    },
  );
