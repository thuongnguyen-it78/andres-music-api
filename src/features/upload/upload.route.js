import express from 'express'
import { upload } from '../../utils/multer-storage';
const router = express.Router()
import uploadController from './upload.controller'

router.post('/single', upload.single('image'), uploadController.single);
router.post('/multiple', upload.any(), uploadController.multiple);

export default router