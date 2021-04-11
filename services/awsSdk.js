const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config/keys");
const hasher = require("./hasher")();

aws.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region:'us-east-2'
});

module.exports = () => {
  var methods = {};

  methods.s3 = new aws.S3();

  methods.fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
  };

  methods.uploadImage =  multerS3({
    acl: "public-read",
    s3: methods.s3,
    bucket: config.S3_BUCKET,
    key: function (req, file, cb) {
      const fileName = hasher.hashImage(file.originalname) + '.' + file.mimetype.split('/')[1];
      cb(null, fileName);
    },
  });

  methods.upload = multer({
    storage: methods.uploadImage,
    fileFilter: methods.fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
  });

  methods.getImage = (key) => {
    const s3params = { 
      Bucket: config.S3_BUCKET,
      Key: key 
    };
    return new Promise((resolve, reject) => {
      methods.s3.getObject(s3params, function(err, data) {
        if (err) {
          reject(err);
        }else{
          resolve(data.Body);
        }
       
      });
    });
  }

  return methods;
}