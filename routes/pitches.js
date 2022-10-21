const express = require('express')
const router = express.Router()
const cors = require('cors')
const app = express()

const PitchesController = require('../controllers/pitches')

app.use(cors({ origin: '*', credentials: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

router.get('/api/getPitches', PitchesController.getPitches)
router.get('/api/getPitchById/:id', PitchesController.getPitchById)
router.post('/api/addPitch', PitchesController.addPitch)
router.patch('/api/editPitch/:id', PitchesController.editPitch)
router.delete('/api/removePitch/:id', PitchesController.removePitch)

module.exports = router
