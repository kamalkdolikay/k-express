/**
 * UsersController
 *
 * @author      :: Kamal Dolikay
 * @description :: Server-side logic for managing users
 * @email       :: kamaldolikay@gmail.com
 */

var UsersService = require('../services/UsersService');

module.exports = {

    index: function(req, res) {
        UsersService.index1(req, res);
    }
};