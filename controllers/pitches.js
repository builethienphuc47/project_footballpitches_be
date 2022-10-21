const Pitches = require('../models/pitches')

const getPitches = async (req, res) => {
  try {
    const pitches = await Pitches.find()
    if (pitches.length > 0) {
      res.status(200).json({
        pitches: pitches.reverse(),
      })
    } else {
      res.status(200).json({
        message: 'No results',
        pitches,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const getPitchById = (req, res) => {
  try {
    const id = req.params.id
    Pitches.findById(id).then((response) => {
      res.json({
        response,
      })
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const addPitch = async (req, res) => {
  try {
    const { pitchName, pitchSize, information, price } = req.body
    if (!pitchName || !pitchSize || !information || !price) {
      res.status(400).json({ message: 'Some field not null' })
    }
    let pitch = new Pitches({
      pitchName,
      pitchSize,
      information,
      price,
    })
    await pitch.save()
    await res.status(200).json({
      message: 'Add pitch successfully!',
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const editPitch = (req, res) => {
  try {
    let id = req.params.id
    Pitches.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
      (data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Pitch with id=${id}. Maybe Pitch was not found!`,
          })
        } else res.send({ message: 'Pitch was updated successfully.' })
      },
    )
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const removePitch = (req, res) => {
  try {
    let id = req.params.id
    Pitches.findByIdAndRemove(id).then(() => {
      res.json({
        message: 'Pitch Deleted Successfully!',
      })
    })
  } catch (error) {
    res.json({
      message: 'Pitch Deleted Unsuccessfully!',
    })
  }
}

module.exports = {
  getPitches,
  getPitchById,
  addPitch,
  editPitch,
  removePitch,
}
