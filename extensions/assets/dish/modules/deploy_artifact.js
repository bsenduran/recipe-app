var deploy = {};
(function(deploy) {
    var lg = new Log('depoly_artifact');
    lg.info('Request received');

    var ADMIN_SERVICE_URL = "https://localhost:9445/services"; // URL to admin services without last '/'
    var USERNAME = "admin";
    var PASSWORD = "admin";


    var ws = require("ws");

    var req = new ws.WSRequest();
    var options = new Array();

    options.useSOAP = 1.2;


    deploy.deployTemplate = function (name, url) {
        options.action = "urn:importResource";

        var payload = '<ser:importResource xmlns:ser="http://services.resource.registry.carbon.wso2.org">'
            + '<ser:parentPath>/_system/governance/recipeTemplates</ser:parentPath>'
            + '<ser:resourceName>' + name + '_template</ser:resourceName>'
            + '<ser:mediaType>text/plain</ser:mediaType>'
            + '<ser:description>template</ser:description>'
            + '<ser:fetchURL>' + url + 'template.xml</ser:fetchURL>'
            + '</ser:importResource>';

        var result;

        try {
            // Open connection to Resource Admin service - url currently hardcoded
            req.open(options, ADMIN_SERVICE_URL + "/ResourceAdminService", false, USERNAME, PASSWORD); // URI with offset=2 in ESB//

            // Send task.xml
            req.send(payload);



        } catch (e) {

            print(e.toString()); // Print error if something goes wrong

        }
    };

    deploy.deployTransform = function (name, url) {
        // Method for importing resource
        options.action = "urn:importResource";

        var payload = '<ser:importResource xmlns:ser="http://services.resource.registry.carbon.wso2.org">'
            + '<ser:parentPath>/_system/governance/recipeTransformations</ser:parentPath>'
            + '<ser:resourceName>' + name + '_transformation</ser:resourceName>'
            + '<ser:mediaType>text/xml</ser:mediaType>'
            + '<ser:description>transformation</ser:description>'
            + '<ser:fetchURL>' + url +'transformation.xml' + '</ser:fetchURL>'
            + '</ser:importResource>';

        var result;

        try {
            // Open connection to Resource Admin service - url currently hardcoded
            req.open(options, ADMIN_SERVICE_URL + "/ResourceAdminService", false, USERNAME, PASSWORD); // URI with offset=2 in ESB//

            // Send task.xml
            req.send(payload);



        } catch (e) {

            print(e.toString()); // Print error if something goes wrong

        }
    };

    deploy.deployTask = function(task_data) {
        options.action = "urn:addTaskDescription";

        // Fetch file from url
        //var taskData = get(overview_url + '/task.xml', '', 'xml');
        var xmlTaskData = new XML(task_data);

        lg.info("=======");
        lg.info(xmlTaskData);



        try {
            // Open connection to Task Admin service - url currently hardcoded
            req.open(options, ADMIN_SERVICE_URL + "/TaskAdmin", false, USERNAME, PASSWORD); // URI with offset=2 in ESB//

            // Send task.xml
            req.send('<ns1:addTaskDescription xmlns:ns1="http://org.apache.axis2/xsd">' + xmlTaskData + '</ns1:addTaskDescription>');



        } catch (e) {

// 		print(e.toString()); // Though deploying task is completed, still returns an error

        }
    };

}(deploy));
