/**
 * Refreshtoken.js
 *
 * @author      :: Kamal Dolikay
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @email       :: kamaldolikay@gmail.com
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Refreshtoken = new Schema({
        userId: {
            type: String,
            required: true
        },
        clientId: {
            type: String,
            required: true
        },
        token: {
            type: String,
            unique: true,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('Refreshtoken', Refreshtoken, 'Refreshtoken');