
const { toInteger } = require('lodash');
const Expense = require('../model/expense');
let User = require('../model/model');



exports.newExpense = async (req, res, next) => {

  try {
    let description = req.body.description;
    let price = req.body.price;
    let category = req.body.category;

    let newExpense = new Expense({
      Description: description,
      Price: price,
      Category: category,
      userId: req.user._id,
    })
    await newExpense.save()
    try {
      let user = await User.findOne({ _id: req.user._id })
      user.totalExpense = toInteger(price) + user.totalExpense
      user.save()

    } catch (err) {
      console.log(err)
      return res.status(500).json({ 'error': err })
    }
    res.status(200).send(newExpense);

  } catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}

exports.allExpense = async (req, res, next) => {
  try {
    let Id = req.user._id;
    let rowNumber = req.header('rowNumber')
    let index = req.header('index')
    rowNumber = toInteger(rowNumber)
    let skip = rowNumber
    let total = await Expense.find({ userId: Id })
    if (total.length >= index * skip) {
      Expense.find({ userId: Id }).skip(index * skip).limit(skip)
        .then(result => {
          res.status(200).json({ data: result, prime: req.user.isPrime, total: total.length })
        })
        .catch(err => {
          console.log(err)
          return res.status(500).json({ 'error': err })
        })
    }
    else {
      res.status(201).json({ msg: 'no data found', prime: req.user.isPrime })
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }

}

exports.deleteExpense = async (req, res, next) => {
  try {
    let Id = req.body.id;
    let userId = req.user._id;

    let exp = await Expense.findById(Id);
    try {
      let user = await User.findById(req.user._id)
      user.totalExpense = user.totalExpense - exp.Price;
      user.save();
      let m = await Expense.findByIdAndRemove(exp._id);
      res.send('item deleted');
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ 'error': err })
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': err })
  }
}

exports.editexp = async (req, res, next) => {
  try {
    let editId = req.body.editId;
    let Exe = await Expense.findById(editId);
    res.status(201).json({ data: Exe, prime: req.user.isPrime })
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': err })
  }
}
exports.updateExpense = async (req, res, next) => {
  try {
    let Id = req.body.id;
    let userId = req.user.id;
    let exp = await Expense.findById(Id);
    let user = await User.findById(userId)
    try {
      exp.Description = req.body.description;
      exp.Price = req.body.price;
      exp.Category = req.body.category;
      exp.save();

      user.totalExpense = (user.totalExpense - exp.Price) + toInteger(req.body.price);
      user.save();
      res.send('item updeted');

    } catch (err) {
      console.log(err);
      return res.status(500).json({'msg':'something wrong data not save' ,'error': err })
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': err })
  }
}

