var api = {};
(function () {
    var provider = {
        "authorizeUrl": "http://some.jira.host/plugins/servlet/oauth/authorize",
        "accessTokenUrl": "http://some.jira.host/plugins/servlet/oauth/access-token",
        "callbackUrl": "https://www.google.lk/",
        "requestTokenUrl": "http://some.jira.host/plugins/servlet/oauth/request-token",
        "signatureMethod": "RSA-SHA1",
        "consumerKey": "recipe-app",
        "rsaPublicKey": "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0YjCwIfYoprq/FQO6lb3asXrxLlJFuCvtinTF5p0GxvQGu5O3gYytUvtC2JlYzypSRjVxwxrsuRcP3e641SdASwfrmzyvIgP08N4S0IFzEURkV1wp/IpH7kH41EtbmUmrXSwfNZsnQRE5SYSOhh+LcK2wyQkdgcMv11l4KoBkcwIDAQAB-----END PUBLIC KEY-----"
    };

    api.getJiraProviderConfig = function () {
        return provider;
    }

    api.getRedirectUrl = function(){
        return provider.callbackUrl;
    }
    api.getAccessTokenUrl = function () {
        return provider.accessTokenUrl;
    }

}());