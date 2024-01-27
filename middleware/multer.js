const multer  = require('multer')
const path=require('path')
 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null,Date.now()+'-'+ file.originalname)
  }
 
})
const Upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB (adjust as needed)
    },
  })

// const Upload=multer({storage: storage})
module.exports= Upload;