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
  '/',
  celebrate({
    [Segments.BODY]: {
      technology_id: Joi.string().required().uuid(),
      name: Joi.string().required(),
    },
  }),
  technologiesController.update,
);

export default technologiesRouter;
