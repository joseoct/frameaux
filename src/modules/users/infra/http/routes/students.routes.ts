import { Router } from 'express';
// import multer from 'multer';
// import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureRole from '../middlewares/ensureRole';

import StudentsController from '../controllers/StudentsController';

const studentsRouter = Router();

const studentsController = new StudentsController();

studentsRouter.use(ensureAuthenticated);

studentsRouter.use(ensureRole(['administrator']));

studentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  studentsController.create,
);

export default studentsRouter;
