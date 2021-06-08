require('dotenv').config()

let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let app = express()
let multer = require('multer')
let upload = multer({ dest: './uploads/' })
let cloudinary = require('cloudinary')

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/', upload.single('myFile'), (req, res) => {
  res.send(req.file)
})

app.listen(5000)
