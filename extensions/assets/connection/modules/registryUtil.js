/**
 * Created by ravindra on 10/1/14.
 * This is used to manipulate carbon registry. All the read, update and delete operation against the registry should use these utility methods defined here.
 */
var api = {};
(function () {
    var carbon = require('carbon');
    var url = 'https://localhost:9443/admin/carbon/';
    var server = new carbon.server.Server(url);
    var options = {
        username: 'admin',
        domain: 'carbon.super',
        tenantId: -1234
    };
    var registry = new carbon.registry.Registry(server, options);
    var dataStore = new MetadataStore("admin", "admin");

    var getAccountsContent = function (path) {
        // log.info(path);
        var res;
        // We assume that at least an empty Account file exists in the registry at this point.
        res = dataStore.get(path);
        return res.content;
    };

    api.insertNewAccount = function (path, newAcct, newAuthInfo) {
        var log = new Log();
        var accountContent = getAccountsContent(path);

        var acctContentJSON = parse(accountContent);

        // If there's no any user account with the given name then create one.
        if (!acctContentJSON.hasOwnProperty(newAcct)) {
            // Setting the JSON contents here.
            acctContentJSON[newAcct] = parse(newAuthInfo);

            var res = dataStore.get(path);
            // Setting the registry resource here.
            res.content = stringify(acctContentJSON);

            // updating the registry with the new resource here.
            dataStore.put(path, res);
        }
    };

    api.deleteAccount = function (path, acct) {
        var accountContent = parse(getAccountsContent(path));

        // delete the relevant entry from the JSON object.
        delete accountContent[acct];

        // Get the registry and update the content.
        var res = dataStore.get(path);

        // setting the registry resource content here.
        res.content = stringify(accountContent);

        // updating the registry with the new resource here.
        dataStore.put(path, res);
    };
}());