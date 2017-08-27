/**
 * Clients.js
 *
 * @author      :: Kamal Dolikay
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @email       :: kamaldolikay@gmail.com
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Clients = new Schema({
		name: {
			type: String,
			unique: true,
			required: true
		},
		clientId: {
			type: String,
			unique: true,
			required: true
		},
		clientSecret: {
			type: String,
			required: true
		}
	});

module.exports = mongoose.model('Clients', Clients, 'Clients');

