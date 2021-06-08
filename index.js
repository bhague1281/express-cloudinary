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
  cloudinary.uploader.upload(req.file.path, (result) => {
    var imageId = `${result.public_id}.jpg`
    // res.send(result)
    let src = cloudinary.image(imageId, {
      effect: 'grayscale',
      width: 300,
      x: 0,
      crop: 'crop',
    })
    res.render('image', { imgSrc: src })
  })
})

app.listen(5000)
