// dsach.js
const express = require('express');
const router = express.Router();
const { account } = require('../data.js');

router.get('/dsachuser', async (req, res, next) => {
  try {
    const allData = await account.find({}).exec();
    res.render('dsachuser.ejs', { dataList: allData });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/sua/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const foundAccount = await account.findOne({ username }).exec();

    if (foundAccount) {
      res.render('sua.ejs', { data: foundAccount });
    } else {
      res.render('dsachuser.ejs', { message: 'Không tìm thấy thông tin sinh viên.' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;