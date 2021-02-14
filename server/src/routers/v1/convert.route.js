import { Router } from 'express';
import multer from '../../utils/multer-file';
import { convertAudioToText, convertTextFileToText, convertVideoToText } from '../../controllers/v1/convert.controller';

const convertRouter = Router();

convertRouter
    .route('/audiofile-to-text')
    .post(multer.single('file'), convertAudioToText);

convertRouter
    .route('/textfile-to-text')
    .post(multer.single('file'), convertTextFileToText);

convertRouter
    .route('/videofile-to-text')
    .post(multer.single('file'), convertVideoToText);    

export default convertRouter;