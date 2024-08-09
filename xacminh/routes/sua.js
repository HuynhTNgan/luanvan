const express = require('express');
const app = express();
const router = express.Router();
const { account } = require('../data.js'); // Replace with actual path to data.js

  router.get('/sua/:username', async (req, res, next) => {
    const { username } = req.body;

    try {
      const foundAccount = await account.findOne({ username });

    if (foundAccount) {
      // Tìm thấy dữ liệu sinh viên, chuyển dữ liệu đến trang `sua.ejs`
      
      res.render('sua.ejs', { data: foundAccount });
    } else {
      // Không tìm thấy dữ liệu sinh viên, hiển thị thông báo lỗi
      res.render('dsachuser.ejs', { message: 'Không tìm thấy thông tin sinh viên.' });
    }
    } catch (err) {
      console.error(err); // Lưu lỗi để debug
      next(err); // Chuyển lỗi sang bộ xử lý lỗi
    }
  });
  
router.post('/sua', async (req, res, next) => {
  const { username } = req.body;

  try {
    const foundAccount = await account.findOne({ username });

    if (foundAccount) {
      
      foundAccount.username = req.body.username;
      foundAccount.truong = req.body.truong;
      foundAccount.ht = req.body.ht;
      foundAccount.pw = req.body.pw;

      await foundAccount.save();

      // Redirect to dsachuser.ejs after successful update
      res.redirect('/dsachuser');
    } else {
      res.render('dsachuser.ejs', { message: 'Không tìm thấy thông tin sinh viên.' });
    }
  } catch (err) {
    res.status(500).json('Có lỗi xảy ra trên máy chủ.');
  }
});

module.exports = router;