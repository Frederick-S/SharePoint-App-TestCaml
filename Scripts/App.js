(function ($, window, SP, alertify) {
    function getQueryStringParameters() {
        var params = document.URL.split("?")[1].split("&");
        var obj = {};

        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            obj[singleParam[0]] = decodeURIComponent(singleParam[1]);
        }

        return obj;
    }

    var queryStringParameters = getQueryStringParameters();

    function getLists() {
        var deferred = $.Deferred();

        var targetWebUrl = $.trim($('#web-url').val());

        if (targetWebUrl === '') {
            deferred.reject('Invalid web url.');
        }

        var appWebUrl = queryStringParameters.SPAppWebUrl;
        var requestExecutor = new SP.RequestExecutor(appWebUrl);

        requestExecutor.executeAsync({
            url: appWebUrl + '/_api/SP.AppContextSite(@target)/web/Lists?@target=%27' + targetWebUrl + '%27&$select=ID, Title',
            method: 'GET',
            headers: {
                'accept': 'application/json; odata=verbose'
            },
            success: function (response) {
                deferred.resolve($.parseJSON(response.body));
            },
            error: function (response) {
                deferred.reject(response.statusCode + ": " + response.statusText);
            }
        });

        return deferred.promise();
    }

    function populateLists(data) {
        try {
            var options = '';
            var result = {};
            var results = data['d']['results'];

            for (var i = 1, length = results.length; i < length; i++) {
                result = results[i];

                options += '<option value=\'' + result.Id + '\'>' + result.Title + '</option>';
            }

            $('#available-lists').html(options);
        } catch (error) {
            alertify.error(error, 2000);
        }
    }

    function getListsErrorHandler(errorMessage) {
        alertify.error(errorMessage, 2000);
    }

    var App = {
        run: function () {
            $('#fetch-lists').click(function () {
                getLists().then(populateLists, getListsErrorHandler);
            });
        }
    };

    window.App = App;
})(jQuery, window, SP, alertify);