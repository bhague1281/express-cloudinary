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
  res.render('index.ejs')
})

app.post('/', upload.single('myFile'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    var imageId = `${result.public_id}.jpg`
    // res.send(result)
    let src = cloudinary.image('x6ebsjdkdjfx6qzolopp.jpg', {
      transformation: [
        { effect: 'oil_paint:30', radius: 16, width: 310, x: 0, crop: 'crop' },
        { angle: 0 },
      ],
    })
    res.render('image.ejs', { imgSrc: src })
  })
})

app.listen(5000)
