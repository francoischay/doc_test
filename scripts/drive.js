// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos
(function($) {

    $.drive = function(element, options) {
        var defaults = {
            scopes: ['https://www.googleapis.com/auth/drive.readonly']
        }

        var plugin = this;
            plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            handleClientLoad();
        }

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('drive').publicMethod(arg1, arg2, ... argn) from outside the plugin, where "element"
        // is the element the plugin is attached to;

        plugin.printFile = function(_fileId) {
            var request = gapi.client.drive.files.get({
               'fileId': fileId
            });
            request.execute(function(resp) {
                console.table(resp);
                console.log('Title: ' + resp.title);
                console.log('Description: ' + resp.description);
                console.log('MIME type: ' + resp.mimeType);
            });
        }

        plugin.retrieveAllFilesInFolder = function(folderId, callback) {
            var retrievePageOfChildren = function(request, result) {
                request.execute(function(resp) {
                    result = result.concat(resp.items);
                    var nextPageToken = resp.nextPageToken;
                    if (nextPageToken) {
                        request = gapi.client.drive.children.list({
                          'folderId' : folderId,
                          'pageToken': nextPageToken
                        });
                        retrievePageOfChildren(request, result);
                    } 
                    else {
                        console.table(result);
                    }
                });
            }
            var initialRequest = gapi.client.drive.children.list({
                'folderId' : folderId
            });
            retrievePageOfChildren(initialRequest, []);
        }

        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)

        var handleClientLoad = function() {
            console.log("handleClientLoad");
            window.setTimeout(checkAuth, 1);
        }

        var checkAuth = function(){
            gapi.auth.authorize({'client_id': plugin.settings.clientID, 'scope': plugin.settings.scopes, 'immediate': true}, handleAuthResult);
        }

        var handleAuthResult = function(authResult) {
                if (authResult && !authResult.error) {
                    // Access token has been successfully retrieved, requests can be sent to the API.=
                    gapi.client.load("drive", "v2", function(){
                        $(window).trigger("drive:authentificated", [authResult]);
                        //plugin.retrieveAllFilesInFolder("0ByBvUGfu9YAbeEFtVGN2OXlIMkk");
                    })
                } 
                else {
                    // No access token could be retrieved, show the button to start the authorization flow.
                    $btnAuth.on("click", function() {
                      gapi.auth.authorize(
                          {'client_id': plugin.settings.clientID, 'scope': plugin.settings.scopes, 'immediate': false},
                          handleAuthResult);
                    });
                }
            }

        plugin.init();

    }

    $.fn.drive = function(options) {
        if (undefined == $("body").data('drive')) {
            var plugin = new $.drive(this, options);
            $("body").data('drive', plugin);
        }
    }

})(jQuery);