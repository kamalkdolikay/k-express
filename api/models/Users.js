/**
 * Users.js
 *
 * @author      :: Kamal Dolikay
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @email       :: kamaldolikay@gmail.com
 */

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const Users = new Schema({
		username: {
			type: String,
			unique: true,
			required: true
		},
		hashedPassword: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			required: true
		},
		created: {
			type: Date,
			default: Date.now
		}
	});

Users.methods.encryptPassword = function(password) {
return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
//more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('hex');
};

Users.virtual('userId')
.get(function () {
return this.id;
});

Users.virtual('password')
.set(function(password) {
	this._plainPassword = password;
	this.salt = crypto.randomBytes(32).toString('hex');
			//more secure - this.salt = crypto.randomBytes(128).toString('hex');
			this.hashedPassword = this.encryptPassword(password);
		})
.get(function() { return this._plainPassword; });


Users.methods.checkPassword = function(password) {
return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('Users', Users, 'Users');
