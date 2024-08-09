const express = require('express');
const app = express();
const router = express.Router();
const { accountData } = require('../data.js'); // Thay thế `../data.js` bằng đường dẫn thực tế đến tệp dữ liệu của bạn


router.post('/ketqua', async (req, res, next) => {
  const { mssv, sohieu } = req.body;

  try {
    const foundAccount = await accountData.findOne({ mssv, sohieu });

    if (foundAccount) {
      // Tìm thấy dữ liệu sinh viên, chuyển dữ liệu đến trang `ketqua.ejs`
      res.render('ketqua.ejs', { data: foundAccount });
    } else {
      // Không tìm thấy dữ liệu sinh viên, hiển thị thông báo lỗi
      res.render('kqxacthuc.ejs', { message: 'Không tìm thấy thông tin sinh viên.' });
    }
  } catch (err) {
    // Lỗi xảy ra trong quá trình xử lý, hiển thị thông báo lỗi
    res.status(500).json('Có lỗi xảy ra trên máy chủ.');
  }
});

module.exports = router;
