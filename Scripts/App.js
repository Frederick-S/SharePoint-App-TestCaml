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

    function getListsByWebUrl(webUrl) {
        var deferred = $.Deferred();

        var appWebUrl = queryStringParameters.SPAppWebUrl;
        var requestExecutor = new SP.RequestExecutor(appWebUrl);

        requestExecutor.executeAsync({
            url: appWebUrl + '/_api/SP.AppContextSite(@target)/web/Lists?@target=%27' + webUrl + '%27&$select=ID, Title',
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

    function getListsByWebUrlErrorHandler(errorMessage) {
        alertify.error(errorMessage, 2000);
    }

    function getListItemsByListId(webUrl, listId) {
        var deferred = $.Deferred();

        var appWebUrl = queryStringParameters.SPAppWebUrl;
        var requestExecutor = new SP.RequestExecutor(appWebUrl);

        var viewXml = $.trim($('#caml').val());

        var query = {
            'query': {
                '__metadata': {
                    'type': 'SP.CamlQuery'
                },
                'ViewXml': viewXml
            }
        };

        requestExecutor.executeAsync({
            url: appWebUrl + '/_api/SP.AppContextSite(@target)/web/Lists/GetById(\'' + listId + '\')/GetItems?@target=%27' + webUrl + '%27&$expand=FieldValuesAsText',
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'accept': 'application/json; odata=verbose',
                'content-type': 'application/json; odata=verbose'
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

    function renderListItems(data) {
        alert(data);
    }

    function getListItemsByListIdErrorHandler(errorMessage) {
        alertify.error(errorMessage, 2000);
    }

    var App = {
        run: function () {
            $('#fetch-lists').click(function () {
                var webUrl = $.trim($('#web-url').val());

                if (webUrl === '') {
                    alertify.error('Invalid web url.', 2000);

                    return;
                }

                getListsByWebUrl(webUrl).then(populateLists, getListsByWebUrlErrorHandler);
            });

            $('#execute-query').click(function () {
                var webUrl = $.trim($('#web-url').val());
                var listId = $('#available-lists').val();

                getListItemsByListId(webUrl, listId).then(renderListItems, getListItemsByListIdErrorHandler);
            });
        }
    };

    window.App = App;
})(jQuery, window, SP, alertify);