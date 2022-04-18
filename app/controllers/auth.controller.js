const models = require('../models');
const response = require('../functions/serviceUtil.js');
const auth = require('../middlewares/auth.js');
const CustomError = require('../functions/CustomError');

module.exports = {
  name: 'authController',

  login: async (req, res, next) => {
    try {
      // Start Transaction
      const result = await models.sequelize.transaction(async (transaction) => {
        if (!req.body.password) throw new CustomError('Please send a Password', 412);

        const user = await models.users.findOne({
          where: {
            email: req.body.email,
          },
          transaction,
        })

        if (!user) throw new CustomError('Incorrect User or Password', 401)
        if (!user.checkPassword(req.body.password)) throw new CustomError('Incorrect User or Password', 401)
        
        return {
          token: auth.generateAccessToken({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }),
          user,
        }
      })
      // Transaction complete!
      res.status(200).send(response.getResponseCustom(200, result))
      res.end()
    } catch (error) {
      // Transaction Failed!
      next(error)
    }
  },
}
