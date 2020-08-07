import express from 'express';
import ClassesController from './controllers/ClassesController';
export const routes = express.Router();
const classesControllers = new ClassesController();

routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);
