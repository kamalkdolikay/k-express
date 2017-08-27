/**
 * UsersController
 *
 * @author      :: Kamal Dolikay
 * @description :: Server-side logic for managing users
 * @email       :: kamaldolikay@gmail.com
 */

import UsersService from '../services/UsersService';

module.exports = {

    index: (req, res) => {
        UsersService.index1(req, res);
    }
};