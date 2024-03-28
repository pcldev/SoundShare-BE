import { createAudio, findAll, findById } from '@controllers/audio';
import { createFile } from '@controllers/file';
import express from 'express';
const audioRouter = express.Router();

// const authServices = require('../services/auth.services');

audioRouter.post('/find-all', findAll);

audioRouter.post('/', createAudio);

audioRouter.get('/:id', findById);

// audioRouter.put('/', audioServices.update);

// audioRouter.delete('/:id', audioServices.deleteById);

export default audioRouter;
