import express from 'express';
import router from './routes/router';
import { middleware } from './utils/middleware';
import cookieParser from 'cookie-parser';
import config from './utils/config';
import urlUtil from './utils/url.util';
import 'express-async-errors';
import './mongo';

const app = express();

app.use(express.json());
app.use(cookieParser());

// For fb login login test purpose
app.get('/', (_req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(
        `
        <html>
          <body>
            <a href="https://www.facebook.com/v8.0/dialog/oauth${urlUtil.makeSearch({
                client_id: config.FACEBOOK_APP_ID,
                redirect_uri: config.SITE_ORIGIN + '/api/session/oauth_facebook',
                state: 'tempState',
                scope: 'email',
            })}">
              Log In With Facebook
            </a>
          </body>
        </html>
      `,
    );
});

app.use('/api', router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
