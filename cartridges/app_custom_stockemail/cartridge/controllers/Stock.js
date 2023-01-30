'use strict';

/**
 * @namespace Stock
 */

var server = require('server');

//var service = require('*/cartridge/services/googlerecaptchaservice');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Stock-Show : 
 * @name Custom/Stock-SubmitQuery
 * @function
 * @memberof Stock
 */
server.post('SubmitQuery',
    server.middleware.https,
    function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var Transaction = require('dw/system/Transaction');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');

    var productId = req.form.productId;
    var email = req.form.email;
    var message = req.form.message;
    var success = false;
    var status = '';
    var statusMessage = '';
    var errorMessage = '';
    var stockQueriesData = CustomObjectMgr.getAllCustomObjects('stockQueries');
    var newQueryId = stockQueriesData.count + 1;
    newQueryId = newQueryId.toString();

    try {
        Transaction.wrap(function () {
            var StockQueriesMgr = CustomObjectMgr.createCustomObject('stockQueries', newQueryId);
            StockQueriesMgr.custom.productId = productId;
            StockQueriesMgr.custom.email = email;
            StockQueriesMgr.custom.message = message;
            StockQueriesMgr.custom.uniqueQueryId = productId + ',' + email;
        });
        success = true;
        status = 'Success!';
        statusMessage = 'Your query has been submitted and you will get response soon. Thanks';
    } 
    catch (e) {
        success = false;
        status = 'Error!';
        statusMessage = 'Your request is not submitted with success due to some error. Try again later.';
        errorMessage = e;
    }
    
    res.render('custom/query_success', { status: status, message: statusMessage });
    next();
});

module.exports = server.exports();
