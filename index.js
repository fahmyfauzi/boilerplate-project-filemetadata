var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.json())
app.use(express.urlencoded({extend:true}))


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: './uploads' })
app.post("/api/fileanalyse", upload.single("upfile") ,(req,res) => {

  //ambil data dari file yang diupload
  let name = req.file.originalname
  let type = req.file.mimetype
  let size = req.file.size

  //kembalikan response
  return res.send({
    name,
    type,
    size
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
