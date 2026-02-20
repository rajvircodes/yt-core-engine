const express = require('express');
const multer = require('multer');


// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    // Use the original fieldname and a timestamp to avoid naming conflicts
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});