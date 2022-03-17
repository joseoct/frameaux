import { Router } from 'express';
// import multer from 'multer';
// import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureRole from '../middlewares/ensureRole';

import ContentCreatorsController from '../controllers/ContentCreatorsController';

const contentCreatorsRouter = Router();

const contentCreatorsController = new ContentCreatorsController();

contentCreatorsRouter.use(ensureAuthenticated);

contentCreatorsRouter.use(ensureRole(['administrator']));

contentCreatorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  contentCreatorsController.create,
);

contentCreatorsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
    },
  }),
  contentCreatorsController.index,
);

export default contentCreatorsRouter;
