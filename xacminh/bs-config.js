const express = require('express')
const app = express()

const { accountData, account } = require('./data.js'); // Destructure exported models
const bcrypt = require('bcrypt'); // Install bcrypt if needed

app.use(express.static('src'))
var session = require('express-session');
// doc du lieu tu body gui
var bodyParser = require('body-parser') 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// khai bao de app su dung duoc thu muc views
var path = require('path');
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
//khai baoo session
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000*300 }
}))

//
const add = require('./routes/add')
const xacthuc = require('./routes/xacthuc')
const logout = require('./routes/logout')
const login = require('./routes/login')
const dsach = require('./routes/dsach')
const tracuu = require('./routes/tracuu')
const ketqua = require('./routes/ketqua')
const adduser = require('./routes/adduser')
const xoa = require('./routes/xoa')
const xoauser = require('./routes/xoauser')
const dsachuser = require('./routes/dsachuser')
const sua = require('./routes/sua')

app.use(xacthuc);
app.use(logout);
app.use(login);
app.use(add);
app.use(dsach);
app.use(dsachuser);
app.use(tracuu);
app.use(ketqua);
app.use(adduser);
app.use(xoa);
app.use(sua);
app.use(xoauser);

app.get('/test', function (req, res) {
  res.sendFile( __dirname + "/src/index.html")
})
app.get('/test', function (req, res) {
  res.sendFile( __dirname + "/src/index2.html")
})
//user


//admin
app.get('/add', function (req, res, next) {
  if(req.session.loggedinUser){
    res.render('add.ejs')
  }else{
    res.redirect('/xacthuc');
  }
})

app.get('/ketqua', function (req, res, next) {
  if(req.session.loggedinUser){
    res.render('ketqua.ejs')
  }else{
    res.redirect('/xacthuc');
  }
  
})

module.exports = {
  "server": {
    "baseDir": ["./src", "./build/contracts"],
    "routers": {
      "/node_modules": "node_modules"
    },
    middleware: {
      1:app,
    }
  },
}
