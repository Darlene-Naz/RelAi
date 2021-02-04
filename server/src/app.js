import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

const app = express();
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
 
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

export default app;