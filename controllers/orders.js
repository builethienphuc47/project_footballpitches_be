const Orders = require('../models/orders')

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find()
    if (orders.length > 0) {
      res.status(200).json({
        orders: orders.reverse(),
      })
    } else {
      res.status(200).json({
        message: 'No results',
        orders,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.id
    const filter = {
      $and: [
        {
          userId: {
            $regex: userId,
            $options: '$i',
          },
        },
      ],
    }
    const orders = await Orders.find(filter)
    if (orders.length > 0) {
      res.status(200).json({
        total: orders.length,
        orders: orders.reverse(),
      })
    } else {
      res.status(200).json({
        message: 'No results',
        orders,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const getOrderById = (req, res) => {
  try {
    const id = req.params.id
    Orders.findById(id).then((response) => {
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

const addOrder = async (req, res) => {
  try {
    let order = new Orders(req.body)
    await order.save()
    await res.status(200).json({
      message: 'Add order successfully!',
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const editOrder = (req, res) => {
  try {
    let id = req.params.id
    Orders.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
      (data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Order with id=${id}. Maybe Order was not found!`,
          })
        } else res.send({ message: 'Order was updated successfully.' })
      },
    )
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const removeOrder = (req, res) => {
  try {
    let id = req.params.id
    Orders.findByIdAndRemove(id).then(() => {
      res.json({
        message: 'Order Deleted Successfully!',
      })
    })
  } catch (error) {
    res.json({
      message: 'Order Deleted Unsuccessfully!',
    })
  }
}

module.exports = {
  getOrders,
  getOrderById,
  getOrdersByUserId,
  addOrder,
  editOrder,
  removeOrder,
}
