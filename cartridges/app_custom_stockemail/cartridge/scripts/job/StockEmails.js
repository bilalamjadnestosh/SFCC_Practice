'use strict';

var Resource = require('dw/web/Resource');
var Transaction = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');

/**
 * Send reset password emails to migratedcustomers having isCustomerImported and isCustomerPasswordResetEmailSent attributes enabled
 *
 * @param {Object} req - local instance of request object
 */
function sendStockBackEmails(req) {
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var stockEmailHelpers = require('*/cartridge/scripts/helpers/stockEmailHelpers');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    //var StockQueriesData2 = CustomObjectMgr.queryCustomObjects('stockQueries', 'custom.isEmailSent=false');

    var stockQueriesData = CustomObjectMgr.getAllCustomObjects('stockQueries');
    var stockQueriesList = stockQueriesData.asList(0, stockQueriesData.count);
    var stockQueriesArray = stockQueriesList.toArray();
    
    stockQueriesArray.forEach(function (queryItem) {
        var product = ProductMgr.getProduct(queryItem.custom.productId);
        var productUrl = 'https://bgfs-004.dx.commercecloud.salesforce.com/' + URLUtils.url('Product-Show', 'pid', queryItem.custom.productId).relative().toString();

        if(queryItem.custom.isEmailSent !== true && product.available === true) { 
            var emailStatus = stockEmailHelpers.sendStockIsBackEmail(queryItem.custom.email, queryItem.custom.productId, productUrl);

            Transaction.wrap(function () {
                queryItem.custom.isEmailSent = true;
                queryItem.custom.isBackInStock = true;
            });   
        }
    });
    
}


module.exports = {
    sendStockBackEmails: sendStockBackEmails
};
