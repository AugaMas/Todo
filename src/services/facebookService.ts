import https from '../utils/https.util';
import urlUtil from '../utils/url.util';
import config from '../utils/config';
import { FacebookAccessToken } from '../interfaces/Token.interface';
import FacebookAccessTokenException from '../exceptions/FacebookAccessTokenException';

interface Object {
    [key: string]: string;
}

async function getAccessToken(redirectUrlPath: string, code: string, state: string) {
    const facebookAccessTokenUrl = `https://graph.facebook.com/v8.0/oauth/access_token${urlUtil.makeSearch({
        client_id: config.FACEBOOK_APP_ID,
        redirect_uri: config.SITE_ORIGIN + redirectUrlPath,
        client_secret: config.FACEBOOK_SECRET,
        code,
        state,
    })}`;

    const respone = (await https.get(facebookAccessTokenUrl)) as Object;

    if (respone.error) {
        throw new FacebookAccessTokenException();
    }

    return {
        access_token: respone.access_token,
        token_type: respone.token_type,
        expires_in: respone.expires_in,
    } as FacebookAccessToken;
}

async function getProfileInfo(access_token: FacebookAccessToken) {
    const facebookProfileInfoUrl = `https://graph.facebook.com/me${urlUtil.makeSearch({
        access_token: access_token['access_token'],
        fields: 'email,name',
    })}`;

    const facebookProfileInfo = await https.get(facebookProfileInfoUrl);

    return facebookProfileInfo;
}

export default { getAccessToken, getProfileInfo };
