import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
// import ensureAuthenticated from '@modules/technologies/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import TechnologiesController from '../controllers/TechnologiesController';

const technologiesRouter = Router();
const technologiesController = new TechnologiesController();
// technologiesRouter.use(ensureAuthenticated);

const upload = multer(uploadConfig.multer);

technologiesRouter.get('/', technologiesController.index);

technologiesRouter.get(
  '/:technology_id',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().uuid().required(),
    },
  }),
  technologiesController.show,
);

technologiesRouter.post(
  '/',
  upload.single('technology_image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  technologiesController.create,
);

technologiesRouter.put(
  '/:technology_id',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  technologiesController.update,
);

technologiesRouter.delete(
  '/:technology_id',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().uuid().required(),
    },
  }),
  technologiesController.delete,
);

export default technologiesRouter;
