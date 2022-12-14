const express = require('express')
const router = express.Router()
// const cors = require('cors')
const app = express()
const { usersValidation } = require('../helper/usersValidation')
const { allowCrossDomain } = require('../utils/corsMiddleware')

const UsersController = require('../controllers/users')

// app.use(cors({ origin: '*', credentials: true }))
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   )
//   next()
// })

app.use(allowCrossDomain)

router.post('/api/register',usersValidation ,UsersController.register)
router.post('/api/login', UsersController.login)
router.get('/api/getUsers', UsersController.getUsers)
router.get('/api/getUserById/:id', UsersController.getUserById)
router.patch('/api/edit/:id', UsersController.editInfo)
router.delete('/api/remove/:id', UsersController.removeUser)

module.exports = router
