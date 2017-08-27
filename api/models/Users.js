/**
 * Users.js
 *
 * @author      :: Kamal Dolikay
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @email       :: kamaldolikay@gmail.com
 */

import mongoose from 'mongoose';
import crypto from'crypto';
const Schema = mongoose.Schema;

module.exports = {

    User: new Schema({
		username: {
			type: String
		},
		hashedPassword: {
			type: String
		},
		salt: {
			type: String
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
};