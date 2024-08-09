const express = require('express');
const router = express.Router();
const { accountData } = require('../data.js'); // Assuming data access logic

router.get('/xoa', async (req, res, next) => {
  try {
    const allData = await accountData.find({}); // Fetch all documents efficiently
    res.render('xoa.ejs', { dataList: allData }); // Pass data to the template
  } catch (err) {
    console.error(err); // Log the error for debugging
    next(err); // Pass the error to the error handler
  }
});

router.delete('/xoa', async (req, res, next) => {
  try {
    const { mssv, password, truong, sohieu } = req.body; 


    const filteredData = await accountData.findOne({ _sohieu: mssv, password, truong, sohieu }); 

    if (filteredData) { 
      // Delete the found document
      await accountData.deleteOne({ _sohieu: mssv, sohieu });
      console.log(`sinh viên có mssv ${mssv} thuộc trường ${truong} đã được xóa thành công`);
      res.json({ message: 'Xóa thành công!' }); // Success response
    } else {
      console.log(`Không tìm thấy sinh viên có mssv ${mssv} thuộc trường ${truong}`);
      res.status(404).json({ message: 'Không tìm thấy thông tin vừa nhập!' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
