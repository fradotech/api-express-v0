const express = require('express');

const router = express.Router()
const controllers = require('../controllers/index')
const { authMiddleware } = require('../middlewares/auth.js')

router.put('/update-profile', [ authMiddleware ], controllers.usersController.updateProfile)

module.exports = {
  basePath: '/users',
  router,
}
