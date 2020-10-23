export interface TokenDataInterface {
    token: string;
    expiresIn: number;
}

export interface FacebookAccessToken {
    access_token: string;
    token_type: string;
    expires_in: string;
}

export interface DataStoredInToken {
    _id: string;
}
