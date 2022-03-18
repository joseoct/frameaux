import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';

import ContentCreatorTechnologyController from '../controllers/ContentCreatorTechnologyController';

const contentCreatorsTechnologiesRouter = Router();
const contentCreatorTechnologyController = new ContentCreatorTechnologyController();

const upload = multer(uploadConfig.multer);

contentCreatorsTechnologiesRouter.use(ensureAuthenticated);

contentCreatorsTechnologiesRouter.use(ensureRole(['administrator']));

contentCreatorsTechnologiesRouter.post(
  '/',
  upload.single('technology_image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      content_creators_ids: Joi.string().required(),
    },
  }),
  contentCreatorTechnologyController.create,
);

export default contentCreatorsTechnologiesRouter;
