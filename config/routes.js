import express from 'express';
const router = express.Router();

//file imports
import UsersController from '../api/controllers/UsersController';

//Users Routes
router.get('/', UsersController.index);

module.exports = router;