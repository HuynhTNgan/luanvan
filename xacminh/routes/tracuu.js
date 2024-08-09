const express = require('express');
const app = express();
const router = express.Router();
const { accountData } = require('../data.js'); // Giả sử logic truy cập dữ liệu 

router.get('/tracuu', function(req, res, next) {
  res.render('tracuu.ejs'); // Hiển thị trang tra cứu
});

router.post('/tracuu', async (req, res, next) => {
  const { mssv, pw, truong } = req.body;

  try {
    const foundAccount = await accountData.findOne({ mssv, pw, truong });

    if (foundAccount) {
      // Tìm thấy dữ liệu khớp, chuyển hướng đến ketqua.ejs
      res.render('ketqua.ejs', { data: foundAccount });
    } else {

      res.render('tracuu.ejs', { message: 'MSSV hoặc mật khẩu không hợp lệ.' });
    }
  } catch (err) {
    console.error(err); // Lưu lỗi để debug 
    res.status(500).json({ message: 'Có lỗi phía máy chủ' }); // Lỗi máy chủ 
  }
});

module.exports = router;
