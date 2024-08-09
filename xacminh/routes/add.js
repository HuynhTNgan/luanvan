const express = require('express');
const app = express();
const router = express.Router();
const { accountData, account } = require('../data.js'); // Assuming data access logic

router.get('/add', (req, res, next) => {
  res.render('add.ejs'); // Render the add form
});

router.post('/add', async (req, res, next) => {
  const {
    truong,
    mssv,
    bang,
    fullname,
    ngaysinh,
    nganh,
    nam,
    loai,
    hinhthuc,
    sohieu,
    ht,
    pw,
    password
  } = req.body;

  try {
    // Check for duplicate mssv and truong:
    const existingAccount = await accountData.findOne({ mssv, truong });
    if (existingAccount) {
      return res.status(400).json({ message: 'Thông tin đã có, vui lòng kiểm tra lại' });
    }
    
    const createdAccount = await accountData.create({
      truong,
      mssv,
      bang,
      fullname,
      ngaysinh,
      nganh,
      nam,
      loai,
      hinhthuc,
      sohieu,
      ht,
      pw,
      password,
    });

    // Redirect to dsach.ejs to display updated list (optional)
   
      // Redirect to dsach.ejs to display updated list (optional)
      res.redirect(`/dsach?truong=${createdAccount.truong}`);    

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Tạo tài khoản thất bại' });
  }
});
                
module.exports = router;
