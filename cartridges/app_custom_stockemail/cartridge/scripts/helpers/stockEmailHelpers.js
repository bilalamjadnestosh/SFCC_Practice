'use strict';
var URLUtils = require('dw/web/URLUtils');

/**
 * Sends the email to customer for product stock back update
 * @param {string} email - email of customer
 * @param {string} stockProductId - the product id for which customer asked stock update
 * @param {string} productUrl - the product url for which customer asked stock update
 */
function sendStockIsBackEmail(email, stockProductId, productUrl) {
    var Resource = require('dw/web/Resource');
    var Site = require('dw/system/Site');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');

    var objectForEmail = {
        productId: stockProductId,
        productUrl: productUrl
    };

    var stockUpdateEmailType = 7; // adding cutom type here

    var emailObj = {
        to: email,
        subject: Resource.msg('subject.product.stockupdate.email', 'stock', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
        type: stockUpdateEmailType
    };

    emailHelpers.sendEmail(emailObj, 'custom/email/stockBackEmailCustom', objectForEmail);
}



module.exports = {
    sendStockIsBackEmail: sendStockIsBackEmail
};
