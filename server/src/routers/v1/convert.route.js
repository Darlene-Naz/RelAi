import { Router } from 'express';
import multer from '../../utils/multer-file';
import { convertAudioToText, convertTextFileToText } from '../../controllers/v1/convert.controller';

const convertRouter = Router();

convertRouter
    .route('/audio-to-text')
    .post(multer.single('file'), convertAudioToText);

convertRouter
    .route('/textfile-to-text')
    .post(multer.single('file'), convertTextFileToText);

export default convertRouter;

