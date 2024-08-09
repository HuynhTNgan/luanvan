const express = require('express');
const app = express();
const router = express.Router();
const { account } = require('../data.js'); // Giả sử logic truy cập dữ liệu 

router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});

router.post('/login', async (req, res, next) => {
  const { username, pw } = req.body;

  try {
    const foundAccount = await account.findOne({ username, pw });

    if (foundAccount) {
      /// Kiểm tra xem trường (TRG) có phải "Đại học Cần Thơ" không

      if (foundAccount.username === 'Admin') {
        // Người dùng từ ĐH Cần Thơ, chuyển hướng đến admin.ejs
        res.render('adduser.ejs', { account: foundAccount });
      } else {
        // Người dùng từ trường khác, chuyển hướng đến add.ejs
        res.render('add.ejs', { account: foundAccount });
      }
    } else {
      // Không tìm thấy tài khoản khớp, đặt thông báo lỗi và hiển thị login.ejs
      res.render('login.ejs', { message: 'MSSV hoặc mật khẩu không hợp lệ.' });
    }
  } catch (err) {
    console.error(err); // Lưu lỗi để debug 
    res.status(500).json('Có lỗi phía máy chủ'); // Lỗi máy chủ 
  }
});

module.exports = router;
