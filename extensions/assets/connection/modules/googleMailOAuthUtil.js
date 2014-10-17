var api = {};
(function () {
    var provider = {
        "oauth_version": "2",
        "authorization_url": "https://accounts.google.com/o/oauth2/auth",
        "access_token_url": "https://accounts.google.com/o/oauth2/token",
        "api_key": "212972391932-3thmh0maoodoin7t116vb0adpjjvckv0.apps.googleusercontent.com",
        "api_secret": "PY9hUuKKwxj_D92LbawosUKl",
        "callback_url": "https://localhost:9443/recipe-app/asts/connection/googleSuccess?name=googlespreadsheet&type=oauth&version=2",
        "authorize_params": {
            "state": "wso2recipetrial",
            "scope": "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email",
            "access_type": "offline",
            "approval_prompt": "force"
        }            };


    api.getGoogleProviderConfig = function () {
        return provider;
    }

    api.getRedirectUrl = function(){
        return provider.callback_url;
    }

    api.getClientId = function(){
        return provider.api_key;
    }

    api.getClientSecret = function(){
        return provider.api_secret;
    }

    api.getAccessTokenUrl = function () {
        return provider.access_token_url;
    }
}());