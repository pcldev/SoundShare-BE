import { createFile } from '@controllers/file';
import express from 'express';

const fileRouter = express.Router();

fileRouter.post('/', createFile);

export default fileRouter;
