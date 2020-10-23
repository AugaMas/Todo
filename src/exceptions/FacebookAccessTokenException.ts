import HttpException from './HttpException';

class FacebookAccessTokenException extends HttpException {
    constructor() {
        super(400, 'Failed to get access token');
    }
}

export default FacebookAccessTokenException;
