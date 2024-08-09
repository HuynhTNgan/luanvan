const express = require('express');
const router = express.Router();
const { account } = require('../data.js'); // Giả sử logic truy cập dữ liệu 

router.get('/xoauser', async (req, res, next) => {
  try {
    const allData = await account.find({}); // Lấy tất cả tài khoản 
    res.render('xoauser.ejs', { dataList: allData }); // Hiển thị danh sách tài khoản 
  } catch (err) {
    console.error(err); // Lưu lỗi để debug
    next(err); // Chuyển lỗi sang bộ xử lý lỗi
  }
});

router.delete('/xoauser', async (req, res, next) => {
  try {
    const { username, pw } = req.body; // Lấy username và password từ body của request 

    // Lọc theo username và password chính xác (thay thế theo điều kiện thực tế nếu cần)
    const filteredData = await account.findOne({ _username: username, pw }); // Tìm một tài khoản khớp 

    if (filteredData) { // Kiểm tra xem có tìm thấy tài khoản không
      // Xóa tài khoản được tìm thấy
      await account.deleteOne({ _username: username, pw });
      console.log(`Xóa thành công người dùng với username ${username} và password ${pw}`);
      res.json({ message: 'Xóa thành công!' }); // Thông báo thành công (Success response)
    } else {
      console.log(`Không tìm thấy người dùng với username ${username} và password ${pw}`);
      res.status(404).json({ message: 'Không tìm thấy thông tin vừa nhập!' }); // Thông báo lỗi không tìm thấy 
    }
  } catch (err) {
    console.error(err); // Lưu lỗi để debug (Log the error for debugging)
    next(err); // Chuyển lỗi sang bộ xử lý lỗi 
  }
});

module.exports = router;
