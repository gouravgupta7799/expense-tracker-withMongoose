let User = require('../model/model')
// const sequelize = require('../utils/DataBase');
const AWS = require('aws-sdk');
const Downloaded = require('../model/downloaded');
const Expense = require('../model/expense');

exports.leadBoardFeatures = async (req, res, next) => {
  try {
    let leaderboard = await User.find().sort({ totalExpense: 'desc' })
    let leaderboardArray = leaderboard.map(i => {
      return { userName: i.userName, totalExpense: i.totalExpense }
    })
    res.json({ leaderboardArray: leaderboardArray })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}


function UploadToS3(data, fileName) {

  const BUCKET_NAME = process.env.BUCKET_NAME
  const USER_KEY = process.env.USER_KEY
  const SECRET_KEY = process.env.SECRET_KEY

  let S3buk = new AWS.S3({
    accessKeyId: USER_KEY,
    secretAccessKey: SECRET_KEY,

  })
  let params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: 'public-read'
  }
  return new Promise((resolve, reject) => {
    S3buk.upload(params, (err, responce) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      else {
        resolve(responce.Location)
      }
    })
  })

}

exports.downloadExpense = async (req, res, next) => {

  try {
    const userId = req.user._id;
    let allExpenses = await Expense.find({ userId: userId })
    let stingExpenxe = JSON.stringify(allExpenses);
    let d = new Date()
    let fileName = `expence.txt ${userId}/${d}`;
    let fileUrl = await UploadToS3(stingExpenxe, fileName);

    let Download = new Downloaded({
      URL: fileUrl,
      userId: userId
    })
    Download.save()

    res.status(200).json({ fileUrl, success: true })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}


exports.downloadedHistory = async (req, res, next) => {
  try {
    let response = await Downloaded.find({ userId: req.user._id })
    res.json({ response })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}


exports.allExe = async (req, res, next) => {
  try {
    let Id = req.user._id;
    let result = await Expense.find({ userId: Id })
    res.status(200).json({ data: result, prime: req.user.isPrime })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}
