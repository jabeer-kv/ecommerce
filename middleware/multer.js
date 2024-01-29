const multer  = require('multer')
const path=require('path')
 const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'public/uploads/')
  },
  filename: function (req, file, cb)  {
    cb(null,Date.now()+path.extname(file.originalname))
  }
 
})
const Upload = multer({
    storage: Storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB (adjust as needed)
    },
  })

// const Upload=multer({storage: storage})
module.exports= Upload;