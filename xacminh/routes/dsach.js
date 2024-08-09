const express = require('express');
const router = express.Router();
const { accountData } = require('../data.js'); // Assuming data access logic

// Assuming 'account' function retrieves currently logged-in account details

router.get('/dsach', async (req, res, next) => {
  try {

    const filteredData = await accountData.find({ truong: req.query.truong });


    res.render('dsach.ejs', { dataList: filteredData }); // Pass filtered data
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// ... other routes (unchanged)

module.exports = router;
