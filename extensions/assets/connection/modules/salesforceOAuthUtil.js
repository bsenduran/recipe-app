var api = {};
(function () {
    var provider = {
        "oauth_version": "2",
        "authorization_url": "https://login.salesforce.com/services/oauth2/authorize",
        "access_token_url": "https://login.salesforce.com/services/oauth2/token",
        "api_key": "3MVG9Y6d_Btp4xp5NS5XjHs9kGfHkRbkqHl3FYAvCnc86tjATSdAEFxEeXj_yV4nNuX43VOeFIH9DQjxu2n62",
        "api_secret": "2324074892980891031",
        "callback_url": "https://localhost:9443/recipe-app/asts/connection/salesforceSuccess?name=salesforce&type=oauth&version=2",
        "response_type": "code"
    };

    api.getSalesforceProviderConfig = function () {
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