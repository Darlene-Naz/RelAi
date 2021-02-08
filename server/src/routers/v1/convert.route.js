import { Router } from 'express';
import multer from '../../utils/multer-file';
import { convertAudioToText } from '../../controllers/v1/convert.controller';

const convertRouter = Router();

convertRouter
.route('/audio-to-text')
.post(multer.single('file'), convertAudioToText);

export default convertRouter;

