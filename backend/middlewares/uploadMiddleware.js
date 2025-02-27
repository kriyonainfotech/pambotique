const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Filter for allowed file types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/; // Allowed image types
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
  
    if (extname && mimetype) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only images are allowed'), false); // Reject the file
    }
};

// Set up multer instance with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// Export the middleware function that can be used in routes
module.exports = upload;
