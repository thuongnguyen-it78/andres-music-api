import express from 'express'
import { upload } from '../../utils/multer-storage';
const router = express.Router()
import uploadController from './upload.controller'

router.post('/upload/single', upload.single('image'), uploadController.single);
router.post('/upload/multiple', upload.any(), uploadController.multiple);

export default router