var tasks = {};
(function (admin_task) {
    var log = new Log('admin_tasks');
    log.info('Request received');

    var ADMIN_SERVICE_URL = "https://localhost:9445/services"; // URL to admin services without last '/'
    var USERNAME = "admin";
    var PASSWORD = "admin";


    var ws = require("ws");

    var req = new ws.WSRequest();
    var options = new Array();

    options.useSOAP = 1.2;


    admin_task.deployTemplate = function (recipe_name, url) {
        options.action = "urn:importResource";

        var payload = '<ser:importResource xmlns:ser="http://services.resource.registry.carbon.wso2.org">'
            + '<ser:parentPath>/_system/governance/recipeTemplates</ser:parentPath>'
            + '<ser:resourceName>' + recipe_name + '_template</ser:resourceName>'
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

    admin_task.deployTransform = function (recipe_name, url) {
        // Method for importing resource
        options.action = "urn:importResource";

        var payload = '<ser:importResource xmlns:ser="http://services.resource.registry.carbon.wso2.org">'
            + '<ser:parentPath>/_system/governance/recipeTransformations</ser:parentPath>'
            + '<ser:resourceName>' + recipe_name + '_transformation</ser:resourceName>'
            + '<ser:mediaType>text/xml</ser:mediaType>'
            + '<ser:description>transformation</ser:description>'
            + '<ser:fetchURL>' + url + 'transformation.xml' + '</ser:fetchURL>'
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

    admin_task.deployTask = function (task_data) {
        options.action = "urn:addTaskDescription";

        // Fetch file from url
        //var taskData = get(overview_url + '/task.xml', '', 'xml');
        var xmlTaskData = new XML(task_data);

        log.info("=======");
        log.info(xmlTaskData);


        try {
            // Open connection to Task Admin service - url currently hardcoded
            req.open(options, ADMIN_SERVICE_URL + "/TaskAdmin", false, USERNAME, PASSWORD); // URI with offset=2 in ESB//

            // Send task.xml
            req.send('<ns1:addTaskDescription xmlns:ns1="http://org.apache.axis2/xsd">' + xmlTaskData + '</ns1:addTaskDescription>');


        } catch (e) {

// 		print(e.toString()); // Though deploying task is completed, still returns an error

        }
    };

    admin_task.deleteTask = function (task_name) {


    };

    admin_task.isTaskRunning = function (task_name) {

        var isRunning = false;

        options.action = "urn:isESBTaskRunning";

        var payload = '<adm:isESBTaskRunning xmlns:adm="http://admin.core.ntaskint.carbon.wso2.org">' +
            '<adm:taskName>' + task_name + '</adm:taskName>' +
            '</adm:isESBTaskRunning>';

        try {
            req.open(options, ADMIN_SERVICE_URL + "/ESBNTaskAdmin", false, USERNAME, PASSWORD); // URI with offset=2 in ESB//
            req.send(payload);


            var result = req;
            var response = result.responseXML;
            isRunning = response..*::['return'].text();


        }
        catch (e) {
            log.error(e)
        }

        return isRunning;

    };

    admin_task.pauseTask = function(task_name) {

        var response;

        options.action = "urn:pauseESBTask";


        var payload = '<adm:pauseESBTask xmlns:adm="http://admin.core.ntaskint.carbon.wso2.org">' +
            '<adm:name>' + task_name + '</adm:name>' +
            '</adm:pauseESBTask>';

        try {
            req.open(options, ADMIN_SERVICE_URL + "/ESBNTaskAdmin", false, USERNAME, PASSWORD); // URI with offset=2 in ESB//
            req.send(payload);


            var result = req;
            var xmlResponse = result.responseXML;
            response = xmlResponse..*::['return'].text();


        }
        catch (e) {
            log.error(e)
        }

        return response;

    };


    admin_task.resumeTask = function(task_name) {

        var response;

        options.action = "urn:resumeESBTask";


        var payload = '<adm:resumeESBTask xmlns:adm="http://admin.core.ntaskint.carbon.wso2.org">' +
            '<adm:name>' + task_name + '</adm:name>' +
            '</adm:resumeESBTask>';

        try {
            req.open(options, ADMIN_SERVICE_URL + "/ESBNTaskAdmin", false, USERNAME, PASSWORD); // URI with offset=2 in ESB//
            req.send(payload);


            var result = req;
            var xmlResponse = result.responseXML;
            response = xmlResponse..*::['return'].text();


        }
        catch (e) {
            log.error(e)
        }

        return response;

    };

    admin_task.deleteTask = function(task_name) {

        var response;

        options.action = "urn:deleteESBTask";


        var payload = '<adm:deleteESBTask xmlns:adm="http://admin.core.ntaskint.carbon.wso2.org">' +
            '<adm:name>' + task_name + '</adm:name>' +
            '</adm:deleteESBTask>';

        try {
            req.open(options, ADMIN_SERVICE_URL + "/ESBNTaskAdmin", false, USERNAME, PASSWORD); // URI with offset=2 in ESB//
            req.send(payload);


            var result = req;
            var xmlResponse = result.responseXML;
            response = xmlResponse..*::['return'].text();


        }
        catch (e) {
            log.error(e)
        }

        return response;

    };

}(tasks));
