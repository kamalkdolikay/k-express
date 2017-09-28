/**
 * UsersController
 *
 * @author      :: Kamal Dolikay
 * @description :: Server-side logic for managing users
 * @email       :: kamaldolikay@gmail.com
 */

import UsersService from '../services/UsersService';
import mongoose from 'mongoose';
require('../models/Users');
const crypto = require('crypto');

module.exports = {

    index: (req, res) => {
        UsersService.index1(req, res);
    },

    register: (req, res) => {
        console.log("req",req.body)
        var Users = mongoose.model('Users');
        // Users.find({}, function(err,data){
        //     res.send(data);
        // })
        var kd = crypto.createHmac('sha1', '123').update('12345678').digest('hex');
        console.log("kd",kd)
        var user = new Users({
            hashedPassword: kd,
            username:'lol',
            salt:'123'
          })
          user.save(function (err, results) {
            res.json({sata:err})
          });
    }
};