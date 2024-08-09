const mongoose = require('mongoose');

// Connect to MongoDB only once
mongoose.connect('mongodb://127.0.0.1/admin');

const Schema = mongoose.Schema;

// Define separate schemas for clarity and potential future separation
const dataSchema = new Schema({
    fullname: String,
    bang: String,
    truong: String,
    mssv: String,
    ngaysinh: String,
    nganh: String,
    nam: String,
    loai: String,
    hinhthuc: String,
    sohieu: String,
    ht: String,
    pw: String,
    password: String,
}, {
    collection: 'data'
});

const accountSchema = new Schema({
    username: String,
    pw: String,
    ht: String,
    truong:String,
    password: String,

}, {
    collection: 'account'
});

// Create separate models for well-defined boundaries
const accountData = mongoose.model('data', dataSchema);
const account = mongoose.model('account', accountSchema);

// Export both models for usage in other parts of your application
module.exports = { accountData, account };