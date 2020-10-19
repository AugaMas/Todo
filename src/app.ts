import express from 'express';
import router from './routes/router';
import { middleware } from './utils/middleware';
import cookieParser from 'cookie-parser';
import config from './utils/config';
import https from 'https';
import urlUtil from './utils/url.util';
import 'express-async-errors';
import './mongo';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(
        `
        <html>
          <body>
            <a href="https://www.facebook.com/v6.0/dialog/oauth${urlUtil.makeSearch({
                client_id: config.FACEBOOK_APP_ID || '',
                redirect_uri: 'http://localhost:3000/oauth-redirect',
                state: 'tempState',
            })}">
              Log In With Facebook
            </a>
          </body>
        </html>
      `,
    );
});

app.get('/oauth-redirect', async (_req, res) => {
    https.get(
        `https://graph.facebook.com/v8.0/oauth/access_token?client_id=${config.FACEBOOK_APP_ID}&r
    edirect_uri=${encodeURIComponent(config.SITE_ORIGIN)}&client_secret=${config.FACEBOOK_SECRET}`,
        (res) => {
            console.log(res);
        },
    );
    res.send('lalala');
});

app.use('/api', router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
