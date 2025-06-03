const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const uploadMiddleware = require('../middlewares/upload-middleware');
const {uploadImageController, fetchImageController, deleteImageController} = require('../controllers/image-controller');

const router = express.Router();

//upload the image
router.post(
    '/upload', 
    authMiddleware, //first check if user is authenicated
    adminMiddleware, //second check for admin
    uploadMiddleware.single('image'), //upload a single image
    uploadImageController //save it in your mongodb database
);
//to get all the images
router.get('/get', authMiddleware, fetchImageController);

//delete image route
router.delete('/:id', authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;