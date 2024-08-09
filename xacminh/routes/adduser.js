const express = require('express');
const app = express();
const router = express.Router();
const { account } = require('../data.js'); // Giả sử logic truy cập dữ liệu 

router.get('/adduser', (req, res, next) => {
  res.render('adduser.ejs'); // Hiển thị biểu mẫu đăng ký 
});

router.post('/adduser', async (req, res, next) => {
  const {
    truong,
    username,
    ht,
    pw,
    password
  } = req.body;

  try {
    // Kiểm tra trùng lặp user và trường 
    const existingAccount = await account.findOne({ username, truong });
    if (existingAccount) {
      return res.status(400).json({ message: 'Thông tin đã có, vui lòng kiểm tra lại' });
    }

    const createdAccount = await account.create({
      truong,
      username,
      ht,
      pw,
      password,
    });
    res.redirect('/dsachuser');   

  } catch (err) {
    console.error(err); // Lưu lỗi để debug 
    res.status(500).json({ message: 'Tạo tài khoản thất bại' });
  }
});

module.exports = router;
