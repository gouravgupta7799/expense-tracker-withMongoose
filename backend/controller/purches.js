
const Razorpay = require('razorpay');
const Order = require('../model/order');
const User = require('../model/model');


exports.primeMembership = async (req, res, next) => {
  try {
    let rzp = new Razorpay({
      key_id: process.env.ROZARPAY_ID,
      key_secret: process.env.ROZARPAY_SECRET
    })
    const amount = 2500
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ 'error': err })
      }
      let ord = new Order({
        orderId: order.id,
        status: 'PENDING',
        userId: req.user.id
      })
      ord.save()
      return res.status(201).json({ ord, key_id: rzp.key_id })
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}

exports.transactionUpdate = async (req, res, next) => {
  try {
    let order = await Order.findOne({ orderId: req.body.order_id })
    let user = await User.findById(req.user._id)
    user.isPrime = true;

    order.paymantId = req.body.payment_id;
    order.status = req.body.status;
    await order.save()
    await user.save()
    res.status(202).json(`transection ${req.body.status}`)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  };
};

