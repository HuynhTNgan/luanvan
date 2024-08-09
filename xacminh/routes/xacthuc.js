const express = require('express');
const app = express();
const router = express.Router();
const { accountData } = require('../data.js'); // Giả sử logic truy cập dữ liệu

router.get('/xacthuc', function(req, res, next) {
  res.render('xacthuc.ejs'); // Hiển thị trang xác thực (Render the verification page)
});

router.post('/xacthuc', async (req, res, next) => {
  const { mssv, sohieu, truong } = req.body;

  try {
    const foundAccount = await accountData.findOne({ mssv, sohieu, truong});

    if (foundAccount) {
      // Tìm thấy dữ liệu khớp, chuyển hướng đến kqxacthuc.ejs
      res.render('kqxacthuc.ejs', { data: foundAccount }); // Lưu ý tên template kqxacthuc.ejs 
    } else {
      // Không tìm thấy dữ liệu khớp, đặt thông báo lỗi và hiển thị xacthuc.ejs
      console.log(`Không tìm thấy người dùng với Mssv ${mssv} và Trường ${truong}`);
      res.render('loixacthuc.ejs', { message: 'MSSV hoặc số hiệu không hợp lệ.' });
    }
  } catch (err) {  
    console.error(err); // Lưu lỗi để debug (Log the error for debugging)
    res.status(500).json({ message: 'Có lỗi phía máy chủ' }); // Lỗi máy chủ
  }
});

module.exports = router;
