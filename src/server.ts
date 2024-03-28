import express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import userRouter from './routes/user';
import bodyParser from 'body-parser';
import fileRouter from 'routes/fileRoute';
import audioRouter from 'routes/audio';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then((r) => {
    console.info('Connect db successfully');
  })
  .catch((e) => {
    console.error('Connect db failed with error: ', e.message);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

app.use('/api/user', userRouter);
app.use('/api/file', fileRouter);
app.use('/api/audio', audioRouter);
app.use('/public', express.static('public'));

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
