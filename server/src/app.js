import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

export default app;